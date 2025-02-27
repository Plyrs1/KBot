import { DISCORD_STATUS_BASE, StatusEmbed } from '#utils/constants';
import { IncidentNotification } from '#structures/IncidentNotification';
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';
import { ApplyOptions } from '@sapphire/decorators';
import { EmbedBuilder, TimestampStyles, time } from 'discord.js';
import { FetchMethods, FetchResultTypes, fetch } from '@sapphire/fetch';
import { container } from '@sapphire/framework';
import type { StatusPageIncident, StatusPageResult } from '#types/DiscordStatus';
import type { IncidentMessage, Prisma } from '@kbotdev/database';

type DatabaseIncidentData = {
	updatedAt: Date | undefined;
	notifications: IncidentNotification[];
};

@ApplyOptions<ScheduledTask.Options>({
	name: 'discordStatus',
	pattern: '0 */5 * * * *', // Every 5 minutes
	enabled: !container.config.isDev
})
export class UtilityTask extends ScheduledTask {
	public override async run(): Promise<void> {
		const { logger, utility } = this.container;

		const channelData = await utility.settings.getIncidentChannels();
		if (channelData.length === 0) return;

		const response = await fetch<StatusPageResult>(
			`${DISCORD_STATUS_BASE}/incidents.json`,
			{
				method: FetchMethods.Get
			},
			FetchResultTypes.JSON
		).catch(() => null);
		if (!response) return;

		const { incidents } = response;
		logger.debug(`[DiscordStatus] Fetched ${incidents.length} incidents`);

		const dbIncidents = await utility.incidents.getIncidents(incidents.map((incident) => incident.id));

		const formattedData: { incident: StatusPageIncident; data: DatabaseIncidentData }[] = incidents.map((incident) => {
			const entry = dbIncidents.find((dbIncident) => dbIncident.id === incident.id);

			const notifications = channelData.map(({ guildId, channelId }) => {
				if (!entry) return new IncidentNotification(incident.id, guildId, channelId);

				const message = entry.messages.find((message) => message.channelId === channelId);
				return new IncidentNotification(incident.id, guildId, channelId, message);
			});

			return { incident, data: { notifications, updatedAt: entry?.updatedAt ?? undefined } };
		});

		for (const { incident, data } of formattedData.reverse()) {
			const embed = this.embedFromIncident(incident);

			if (!data.updatedAt) {
				await this.handleNotifications(incident, embed, data.notifications, true);
				continue;
			}

			const incidentUpdate = new Date(incident.updated_at ?? incident.created_at);
			if (new Date(data.updatedAt) < incidentUpdate) {
				await this.handleNotifications(incident, embed, data.notifications);
			}
		}
	}

	/**
	 * Send incident notifications to valid channels.
	 * @param incident - The Discord incident
	 * @param embed - The incident's embed
	 * @param notifications - The notifications to be sent
	 * @param newIncident - If the incident is new
	 */
	private async handleNotifications(
		incident: StatusPageIncident,
		embed: EmbedBuilder,
		notifications: IncidentNotification[],
		newIncident = false
	): Promise<void> {
		const { prisma } = this.container;

		const validNotifications: IncidentNotification[] = [];

		const fetchedNotifications = await Promise.all(
			notifications.map((notification) => notification.fetchChannel()) //
		);

		for (const notification of fetchedNotifications) {
			const result = await notification.validateChannel();
			if (result) {
				validNotifications.push(notification);
			}
		}

		const sendMessageResult = await Promise.all(
			validNotifications.map((notification) => notification.sendMessage(embed)) //
		);

		if (newIncident) {
			const messages: Prisma.IncidentMessageCreateManyIncidentInput[] = sendMessageResult.map((notification) => {
				const data = notification.getData();
				return { id: data.id, guildId: data.guildId, channelId: data.channelId };
			});

			await prisma.$transaction([
				prisma.discordIncident.create({
					data: {
						id: incident.id,
						resolved: incident.status === 'resolved' || incident.status === 'postmortem',
						messages: { createMany: { data: messages } }
					}
				})
			]);
		} else {
			const newNotifications: IncidentMessage[] = sendMessageResult
				.filter((result) => {
					return !result.incidentMessage && result.messageId;
				})
				.map((notification) => notification.getData());

			await prisma.$transaction([
				prisma.discordIncident.update({
					where: { id: incident.id },
					data: { resolved: incident.status === 'resolved' || incident.status === 'postmortem' }
				}),
				prisma.incidentMessage.createMany({ data: newNotifications })
			]);
		}
	}

	/**
	 * Build an embed from a Discord incident.
	 * @param incident - The Discord incident
	 */
	private embedFromIncident(incident: StatusPageIncident): EmbedBuilder {
		const color =
			incident.status === 'resolved' || incident.status === 'postmortem'
				? StatusEmbed.Green
				: incident.impact === 'critical'
				? StatusEmbed.Red
				: incident.impact === 'major'
				? StatusEmbed.Orange
				: incident.impact === 'minor'
				? StatusEmbed.Yellow
				: StatusEmbed.Black;

		const affectedComponents = incident.components.map((c) => c.name);

		const embed = new EmbedBuilder()
			.setColor(color)
			.setTimestamp(new Date(incident.started_at))
			.setURL(`https://discordstatus.com/incidents/${incident.id}`)
			.setTitle(incident.name);

		for (const update of incident.incident_updates.reverse()) {
			const name = `${update.status.charAt(0).toUpperCase()}${update.status.slice(1)}`;
			const timeString = time(new Date(update.created_at), TimestampStyles.RelativeTime);
			embed.addFields([
				{
					name: `${name} (${timeString})`,
					value: update.body
				}
			]);
		}

		const descriptionParts = [`• Impact: ${incident.impact}`];

		if (affectedComponents.length) {
			descriptionParts.push(`• Affected Components: ${affectedComponents.join(', ')}`);
		}

		embed.setDescription(descriptionParts.join('\n'));

		return embed;
	}
}

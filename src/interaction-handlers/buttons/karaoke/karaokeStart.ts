import { EmbedColors, KaraokeCustomIds } from '#utils/constants';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { MessageEmbed, StageChannel, TextChannel, VoiceChannel } from 'discord.js';
import { parseCustomId } from '@kbotdev/custom-id';
import type { ButtonInteraction } from 'discord.js';
import type { KaraokeMenuButton } from '#lib/types/CustomIds';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	private readonly customIds = [KaraokeCustomIds.Start];

	public override async run(interaction: ButtonInteraction, { eventId }: InteractionHandler.ParseResult<this>) {
		const { karaoke } = this.container;
		const guildId = interaction.guildId!;

		try {
			const event = await this.container.karaoke.repo.fetchEvent(eventId);
			const scheduledEvent = await interaction.guild!.scheduledEvents.fetch(event!.scheduleId!);

			const [voiceChannel, textChannel] = await Promise.all([
				(await interaction.guild!.channels.fetch(event!.id)) as StageChannel | VoiceChannel,
				(await interaction.guild!.channels.fetch(event!.channel)) as TextChannel
			]);

			const eventExists = await karaoke.repo.doesEventExist(guildId, voiceChannel.id);
			if (eventExists) {
				return interaction.editReply({
					embeds: [new MessageEmbed().setColor(EmbedColors.Default).setDescription('There is already an event going on.')]
				});
			}

			await scheduledEvent.setStatus('ACTIVE');
			await this.container.karaoke.startEvent(interaction, voiceChannel, textChannel, scheduledEvent.name, event!.role!);
			await karaoke.repo.setEventStatus(guildId, voiceChannel.id, true);

			return interaction.defaultReply('Event started.');
		} catch (err) {
			this.container.logger.error(err);
			return interaction.errorReply('There was an error trying to start the event.');
		}
	}

	public override async parse(interaction: ButtonInteraction) {
		if (!this.customIds.some((id) => interaction.customId.startsWith(id))) return this.none();

		const {
			data: { eventId }
		} = parseCustomId<KaraokeMenuButton>(interaction.customId);

		return this.some({ eventId });
	}
}

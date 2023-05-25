import { WelcomeModule } from '#modules/WelcomeModule';
import { isNullOrUndefined } from '#utils/functions';
import { container } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';
import type { GuildMember, GuildTextBasedChannel, HexColorString, Message } from 'discord.js';
import type { WelcomeSettings } from '@kbotdev/database';

export class WelcomeHandler {
	public constructor(private readonly member: GuildMember) {}

	public async run(): Promise<void> {
		const { client, welcome, validator } = container;

		const settings = await welcome.settings.get(this.member.guild.id);
		if (isNullOrUndefined(settings) || !settings.enabled || isNullOrUndefined(settings.channelId)) return;
		if (!settings.message && !settings.title && !settings.description) return;

		const channel = (await client.channels.fetch(settings.channelId)) as GuildTextBasedChannel | null;
		const { result } = await validator.channels.canSendEmbeds(channel);
		if (isNullOrUndefined(channel) || !result) return;

		if (!settings.message) {
			await this.withEmbed(channel, settings);
			return;
		}

		if (!settings.title && !settings.description && !settings.image) {
			await this.withMessage(channel, settings);
			return;
		}

		await this.withMessageAndEmbed(channel, settings);
	}

	private async withEmbed(channel: GuildTextBasedChannel, settings: WelcomeSettings): Promise<Message<true>> {
		const embed = this.createTemplateEmbed(settings.color, settings.image);

		if (settings.title) {
			const title = WelcomeModule.formatText(settings.title, this.member);
			embed.setTitle(title);
		}
		if (settings.description) {
			const desc = WelcomeModule.formatText(settings.description, this.member);
			embed.setDescription(desc);
		}

		return channel.send({
			embeds: [embed]
		});
	}

	private async withMessage(channel: GuildTextBasedChannel, settings: WelcomeSettings): Promise<Message<true>> {
		const message = WelcomeModule.formatText(settings.message!, this.member);

		return channel.send({
			content: message,
			allowedMentions: { users: [this.member.id] }
		});
	}

	private async withMessageAndEmbed(channel: GuildTextBasedChannel, settings: WelcomeSettings): Promise<Message<true>> {
		const embed = this.createTemplateEmbed(settings.color, settings.image);

		if (settings.title) {
			const title = WelcomeModule.formatText(settings.title, this.member);
			embed.setTitle(title);
		}
		if (settings.description) {
			const desc = WelcomeModule.formatText(settings.description, this.member);
			embed.setDescription(desc);
		}

		const message = WelcomeModule.formatText(settings.message!, this.member);

		return channel.send({
			content: message,
			embeds: [embed],
			allowedMentions: { users: [this.member.id] }
		});
	}

	private createTemplateEmbed(color: string | null, image: string | null): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setColor((color as HexColorString | undefined) ?? '#006BFC')
			.setFooter({ text: `Total members: ${this.member.guild.memberCount}` })
			.setTimestamp();
		if (image) embed.setImage(image);
		return embed;
	}
}

import { BlankSpace, EmbedColors } from '#utils/constants';
import { YoutubeChannelService, YoutubeSettingsService, YoutubeSubscriptionService } from '#services';
import { isNullOrUndefined } from '#utils/functions';
import { Module } from '@kbotdev/plugin-modules';
import { EmbedBuilder } from 'discord.js';
import { channelMention, roleMention } from '@discordjs/builders';
import { ApplyOptions } from '@sapphire/decorators';
import type { YoutubeSubscriptionWithChannel } from '@kbotdev/database';
import type { IsEnabledContext } from '@kbotdev/plugin-modules';
import type { KBotModules } from '#types/Enums';

@ApplyOptions<Module.Options>({
	fullName: 'Youtube Module'
})
export class YoutubeModule extends Module {
	public readonly settings: YoutubeSettingsService;
	public readonly channels: YoutubeChannelService;
	public readonly subscriptions: YoutubeSubscriptionService;

	public constructor(context: Module.Context, options: Module.Options) {
		super(context, options);

		this.settings = new YoutubeSettingsService();
		this.channels = new YoutubeChannelService();
		this.subscriptions = new YoutubeSubscriptionService();

		this.container.youtube = this;
	}

	public override async isEnabled({ guild }: IsEnabledContext): Promise<boolean> {
		if (isNullOrUndefined(guild)) return false;
		const settings = await this.settings.get(guild.id);
		return isNullOrUndefined(settings) ? false : settings.enabled;
	}

	public buildSubscriptionEmbed({
		channel,
		message,
		roleId,
		discordChannelId,
		memberDiscordChannelId,
		memberRoleId
	}: YoutubeSubscriptionWithChannel): EmbedBuilder {
		return new EmbedBuilder() //
			.setColor(EmbedColors.Default)
			.setAuthor({ name: 'YouTube notification settings' })
			.setTitle(channel.name)
			.setURL(`https://www.youtube.com/channel/${channel.youtubeId}`)
			.setFields([
				{ name: 'Message', value: message ?? 'No message set.' },
				{
					name: 'Channel',
					value: discordChannelId ? channelMention(discordChannelId) : 'No channel set.',
					inline: true
				},
				{ name: 'Role', value: roleId ? roleMention(roleId) : 'No role set.', inline: true },
				{ name: BlankSpace, value: BlankSpace },
				{
					name: 'Member Channel',
					value: memberDiscordChannelId ? channelMention(memberDiscordChannelId) : 'No channel set.',
					inline: true
				},
				{
					name: 'Member Role',
					value: memberRoleId ? roleMention(memberRoleId) : 'No role set.',
					inline: true
				}
			])
			.setThumbnail(channel.image);
	}
}

declare module '@kbotdev/plugin-modules' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Modules {
		[KBotModules.YouTube]: never;
	}
}

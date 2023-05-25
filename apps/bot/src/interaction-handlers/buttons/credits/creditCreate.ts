import { CreditCustomIds, CreditType } from '#utils/customIds';
import { interactionRatelimit, validCustomId } from '#utils/decorators';
import { isNullOrUndefined, parseCustomId } from '#utils/functions';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { Time } from '@sapphire/duration';
import { ButtonInteraction } from 'discord.js';
import type { Credit } from '#types/CustomIds';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public override async run(interaction: ButtonInteraction<'cached'>, { channelId, emoteId }: InteractionHandler.ParseResult<this>): Promise<void> {
		const modal = this.container.utility.buildCreditModal(channelId, emoteId, CreditType.Emote);
		return interaction.showModal(modal);
	}

	@validCustomId(CreditCustomIds.Create)
	@interactionRatelimit(Time.Second * 30, 5)
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
	public override async parse(interaction: ButtonInteraction) {
		if (!interaction.inCachedGuild()) {
			return this.none();
		}

		if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageGuildExpressions)) {
			await interaction.errorReply('You need the `Manage Emojis And Stickers` permission to use this.', true);
			return this.none();
		}

		const settings = await this.container.utility.settings.get(interaction.guildId);
		if (isNullOrUndefined(settings) || !settings.enabled) {
			await interaction.errorReply(`The module for this feature is disabled.\nYou can run \`/utility toggle\` to enable it.`, true);
			return this.none();
		}

		if (isNullOrUndefined(settings.creditsChannelId)) {
			await interaction.defaultReply('There is no channel set up for credits. You can set one with `/credits set`.', true);
			return this.none();
		}

		const {
			data: { ri }
		} = parseCustomId<Credit>(interaction.customId);

		return this.some({ channelId: settings.creditsChannelId, emoteId: ri });
	}
}

import { CreditCustomIds } from '#utils/customIds';
import { interactionRatelimit, validCustomId } from '#utils/decorators';
import { isNullOrUndefined } from '#utils/functions';
import { parseCustomId } from '#utils/discord';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { Time } from '@sapphire/duration';
import { ButtonInteraction, PermissionFlagsBits } from 'discord.js';
import type { Credit } from '#types/CustomIds';

@ApplyOptions<InteractionHandler.Options>({
	name: CreditCustomIds.Create,
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public override async run(
		interaction: ButtonInteraction<'cached'>,
		{ channelId, emoteId, type }: InteractionHandler.ParseResult<this>
	): Promise<void> {
		const modal = this.container.utility.buildCreditModal(channelId, emoteId, type);
		return interaction.showModal(modal);
	}

	@validCustomId(CreditCustomIds.Create)
	@interactionRatelimit(Time.Second * 30, 5)
	public override async parse(interaction: ButtonInteraction<'cached'>) {
		if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageGuildExpressions)) {
			await interaction.errorReply('You need the `Manage Emojis And Stickers` permission to use this.', {
				tryEphemeral: true
			});
			return this.none();
		}

		const settings = await this.container.utility.settings.get(interaction.guildId);
		if (isNullOrUndefined(settings) || !settings.enabled) {
			await interaction.errorReply(`The module for this feature is disabled.\nYou can run \`/utility toggle\` to enable it.`, {
				tryEphemeral: true
			});
			return this.none();
		}

		if (isNullOrUndefined(settings.creditsChannelId)) {
			await interaction.defaultReply('There is no channel set up for credits. You can set one with `/credits set`.', {
				tryEphemeral: true
			});
			return this.none();
		}

		const {
			data: { ri, t }
		} = parseCustomId<Credit>(interaction.customId);

		return this.some({ channelId: settings.creditsChannelId, emoteId: ri, type: t });
	}
}

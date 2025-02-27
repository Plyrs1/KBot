import { CreditCustomIds, CreditType } from '#utils/customIds';
import { interactionRatelimit, validCustomId } from '#utils/decorators';
import { getResourceFromType, parseCustomId } from '#utils/discord';
import { isNullOrUndefined } from '#utils/functions';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ButtonInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Time } from '@sapphire/duration';
import type { Credit } from '#types/CustomIds';

@ApplyOptions<InteractionHandler.Options>({
	name: CreditCustomIds.ResourceRefresh,
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public override async run(interaction: ButtonInteraction<'cached'>, { resource }: InteractionHandler.ParseResult<this>): Promise<void> {
		const embed = interaction.message.embeds[0];
		const updatedEmbed: EmbedBuilder = EmbedBuilder.from(embed);

		updatedEmbed.setTitle(resource.name!);

		await interaction.message.edit({
			embeds: [updatedEmbed]
		});
	}

	@validCustomId(CreditCustomIds.ResourceRefresh)
	@interactionRatelimit(Time.Second * 10, 1)
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

		await interaction.deferUpdate();

		const {
			data: { ri, t }
		} = parseCustomId<Credit>(interaction.customId);

		const resource = getResourceFromType(interaction.guildId, ri, t);
		if (!resource) {
			await interaction.defaultFollowup(`That ${t === CreditType.Emote ? 'emote' : 'sticker'} has been deleted.`, {
				ephemeral: true
			});
			return this.none();
		}

		if (interaction.message.embeds[0].title === resource.name) {
			return this.none();
		}

		return this.some({ resource });
	}
}

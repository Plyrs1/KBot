import { EmbedColors } from '#utils/constants';
import { PollCustomIds } from '#utils/customIds';
import { validCustomId } from '#utils/decorators';
import { isNullOrUndefined } from '#utils/functions';
import { parseCustomId } from '#utils/discord';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import type { PollOption } from '#types/CustomIds';

@ApplyOptions<InteractionHandler.Options>({
	name: PollCustomIds.Vote,
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public override async run(interaction: ButtonInteraction<'cached'>, { option }: InteractionHandler.ParseResult<this>): Promise<void> {
		const { polls } = this.container.utility;

		const active = await polls.isActive(interaction.guildId, interaction.message.id);
		if (!active) {
			return void interaction.defaultReply('That poll is not active.');
		}

		await polls.upsertVote({
			guildId: interaction.guildId,
			pollId: interaction.message.id,
			userId: interaction.user.id,
			option: Number(option)
		});

		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(EmbedColors.Success)
					.setDescription(`You have voted for option ${Number(option) + 1}`)
					.setFooter({ text: 'Only the latest vote counts' })
			]
		});
	}

	@validCustomId(PollCustomIds.Vote)
	public override async parse(interaction: ButtonInteraction<'cached'>) {
		const settings = await this.container.utility.settings.get(interaction.guildId);
		if (isNullOrUndefined(settings) || !settings.enabled) {
			await interaction.errorReply(`The module for this feature is disabled.\nYou can run \`/utility toggle\` to enable it.`, {
				tryEphemeral: true
			});
			return this.none();
		}

		await interaction.deferReply({ ephemeral: true });

		const {
			data: { option }
		} = parseCustomId<PollOption>(interaction.customId);

		return this.some({ option });
	}
}

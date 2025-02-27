import { KaraokeCustomIds } from '#utils/customIds';
import { KaraokeEventMenu } from '#structures/menus/KaraokeEventMenu';
import { validCustomId } from '#utils/decorators';
import { isNullOrUndefined } from '#utils/functions';
import { parseCustomId } from '#utils/discord';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ButtonInteraction } from 'discord.js';
import type { KaraokeMenuButton } from '#types/CustomIds';

@ApplyOptions<InteractionHandler.Options>({
	name: KaraokeCustomIds.Unschedule,
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public override async run(interaction: ButtonInteraction<'cached'>, { menu, eventId }: InteractionHandler.ParseResult<this>): Promise<void> {
		const { events } = this.container;

		await events.karaoke.deleteEvent(eventId);

		await menu.updateMenuPage(interaction, (builder) => {
			return builder.editEmbed(0, (embed) => embed.setDescription('Event has been unscheduled.'));
		});
	}

	@validCustomId(KaraokeCustomIds.Unschedule)
	public override async parse(interaction: ButtonInteraction<'cached'>) {
		const menu = KaraokeEventMenu.getInstance(interaction.user.id);
		if (isNullOrUndefined(menu)) {
			await interaction.defaultReply('Please run `/manage karaoke menu` again.', {
				tryEphemeral: true
			});
			return this.none();
		}

		const settings = await this.container.events.settings.get(interaction.guildId);
		if (isNullOrUndefined(settings) || !settings.enabled) {
			await interaction.errorReply(`The module for this feature is disabled.\nYou can run \`/events toggle\` to enable it.`, {
				tryEphemeral: true
			});
			return this.none();
		}

		await interaction.deferUpdate();

		const {
			data: { eventId }
		} = parseCustomId<KaraokeMenuButton>(interaction.customId);

		return this.some({ menu, eventId });
	}
}

import { Subcommand } from '@sapphire/plugin-subcommands';
import { ApplyOptions } from '@sapphire/decorators';
import { getGuildIds } from '../../lib/util/config';
import { KaraokeEventMenu } from '../../lib/structures/KaraokeEventMenu';

@ApplyOptions<Subcommand.Options>({
	description: 'Event module',
	preconditions: ['GuildOnly'],
	subcommands: [{ name: 'karaoke', chatInputRun: 'chatInputKaraoke' }]
})
export class EventCommand extends Subcommand {
	public constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, { ...options });
		if (Boolean(this.description) && !this.detailedDescription) this.detailedDescription = this.description;
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName('event')
					.setDescription('Event module')
					.addSubcommand((subcommand) =>
						subcommand //
							.setName('karaoke')
							.setDescription('Open the karaoke menu')
					),
			{ idHints: ['1038259859797323856'], guildIds: getGuildIds() }
		);
	}

	public async chatInputKaraoke(interaction: Subcommand.ChatInputInteraction) {
		await interaction.deferReply({ ephemeral: true });
		return new KaraokeEventMenu(interaction).run();
	}
}

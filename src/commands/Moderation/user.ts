// Imports
import { Command, type ChatInputCommand } from '@sapphire/framework';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { ApplyOptions } from '@sapphire/decorators';
import { getUserInfo } from '../../lib/util/util';
import { getGuildIds, getIdHints } from '../../lib/util/config';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Get info on the selected user or provided ID.',
	detailedDescription:
		'Displays all the info about a user such as: creation date, join date, if they are in the server, if they are banned (and ban reason if applicable).'
})
export class UserInfoCommand extends Command {
	public constructor(context: ChatInputCommand.Context, options: ChatInputCommand.Options) {
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
					.setName('user')
					.setDescription(this.description)
					.addUserOption((option) =>
						option //
							.setName('target')
							.setDescription('Select a user or provide ID')
							.setRequired(true)
					),
			{ idHints: getIdHints(this.name), guildIds: getGuildIds() }
		);
	}

	public async chatInputRun(interaction: ChatInputCommand.Interaction) {
		await interaction.deferReply();
		const embed = await getUserInfo(interaction, interaction.options.getUser('target', true).id);
		return interaction.editReply({ embeds: [embed] });
	}
}

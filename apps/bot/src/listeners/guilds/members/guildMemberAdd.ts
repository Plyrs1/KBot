import { MinageHandler } from '#structures/handlers/MinageHandler';
import { WelcomeHandler } from '#structures/handlers/WelcomeHandler';
import { AntiHoistHandler } from '#structures/handlers/AntiHoistHandler';
import { Events, Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import type { GuildMember } from 'discord.js';

@ApplyOptions<Listener.Options>({
	event: Events.GuildMemberAdd
})
export class GuildListener extends Listener<typeof Events.GuildMemberAdd> {
	public async run(member: GuildMember): Promise<void> {
		const { moderation } = this.container;

		if (member.user.bot) return;

		const settings = await moderation.settings.get(member.guild.id);
		if (settings) {
			const wasKicked = await new MinageHandler(member, settings).run();
			if (wasKicked) return;

			await new AntiHoistHandler().parseMember(member, settings);
		}

		await new WelcomeHandler(member).run();
	}
}

import { container } from '@sapphire/framework';
import { EventSettingsRepository } from '@kbotdev/database';
import type { EventSettings, UpsertEventSettingsData } from '@kbotdev/database';

export class EventSettingsService {
	private readonly repository: EventSettingsRepository;

	public constructor() {
		const { prisma, redis, config } = container;

		this.repository = new EventSettingsRepository({
			database: prisma,
			cache: {
				client: redis,
				defaultExpiry: config.db.cacheExpiry
			}
		});
	}

	/**
	 * Get a guild's event settings.
	 * @param guildId - The ID of the guild
	 */
	public async get(guildId: string): Promise<EventSettings | null> {
		return this.repository.get({ guildId });
	}

	/**
	 * Upsert a guild's event settings.
	 * @param guildId - The ID of the guild
	 * @param data - The settings to upsert
	 */
	public async upsert(guildId: string, data: UpsertEventSettingsData): Promise<EventSettings> {
		return this.repository.upsert({ guildId }, data);
	}
}

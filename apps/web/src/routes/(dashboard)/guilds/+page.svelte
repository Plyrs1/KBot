<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import GuildList from '$components/dashboard/GuildList.svelte';
	import { getGuildsContext } from '$lib/stores/guilds';
	import { setCurrentGuildContext } from '$lib/stores/currentGuild';

	let guilds = getGuildsContext();
	setCurrentGuildContext(undefined);
	let guildFilter = '';

	$: filteredGuilds = [...$guilds.values()].filter(
		(guild) => guild.name.toLowerCase().indexOf(guildFilter.toLowerCase()) !== -1
	);
</script>

<Meta title="Manage Guilds" />

<div
	class="shadow-xl rounded-lg border my-24 mx-auto w-[90vw] lg:max-w-[60vw] border-surface-400-500-token"
>
	<div class="flex flex-col gap-2 xs:flex-row justify-between rounded-t-lg z-50 p-3 w-full">
		<h2 class="text-2xl w-min pl-2">Guilds</h2>
		<form class="max-w-xs">
			<input
				type="text"
				id="guildFilter"
				name="guildFilter"
				placeholder="Search for a guild"
				class="input w-full"
				bind:value={guildFilter}
			/>
		</form>
	</div>
	<div class="flex items-center rounded-b-lg p-5 gap-3">
		<GuildList guilds={filteredGuilds} />
	</div>
</div>

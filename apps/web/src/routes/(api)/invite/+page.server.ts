import { redirect } from '@sveltejs/kit';

export const load = () => {
	throw redirect(
		302,
		'https://discord.com/oauth2/authorize?client_id=918237593789947925&permissions=1376425339926&scope=bot'
	);
};

import { Duration, Time } from '@sapphire/duration';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types
export function isFunction(object: any): object is Function {
	return typeof object === 'function';
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
	return value === null || value === undefined;
}

export function isNullOrUndefinedOrEmpty(value: unknown): value is '' | null | undefined {
	return isNullOrUndefined(value) || (value as unknown[] | string).length === 0;
}

export function flattenObject(object: Record<any, any>): any {
	const result: any = {};

	for (const i in object) {
		if (!object.hasOwnProperty(i)) continue;
		if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
			const temp = flattenObject(object[i]);
			for (const j in temp) {
				if (!temp.hasOwnProperty(j)) continue;
				result[`${i}.${j}`] = temp[j];
			}
		} else {
			result[i] = object[i];
		}
	}

	return result;
}

export function minutesFromNow(minutes: number, time?: number): number {
	return Math.floor(((time ?? Date.now()) + minutes * Time.Minute) / 1000);
}

export function parseTimeString(input: string | null): number | null {
	if (!input) return null;
	const duration = new Duration(input);
	return isNaN(duration.offset) ? null : duration.offset;
}

export function buildCustomId<T = unknown>(prefix: string, data?: T): string {
	if (isNullOrUndefined(data)) return prefix;

	const values = Object.entries(data as Record<string, string>) //
		.map(([key, val]) => `${key}:${val}`);
	return `${prefix};${values.toString()}`;
}

export function parseCustomId<T = unknown>(customId: string): { prefix: string; data: T } {
	const { 0: prefix, 1: data } = customId.split(';');

	const parsedData = data
		.split(',') //
		.reduce<Record<string, string>>((acc, cur) => {
			const [key, val] = cur.split(':');
			acc[key] = val;
			return acc;
		}, {}) as T;

	return { prefix, data: parsedData };
}

import { Period } from "@/types/analytics";
import { endOfMonth, intervalToDuration, startOfMonth } from "date-fns";

function toDateSafe(value: Date | string | null | undefined) {
	if (!value) return null;
	return value instanceof Date ? value : new Date(value);
}

export function DatesToDurationString(
	end: Date | string | null | undefined,
	start: Date | string | null | undefined
) {
	const endDate = toDateSafe(end);
	const startDate = toDateSafe(start);

	if (!startDate || !endDate) return null;

	const timeElapsed = endDate.getTime() - startDate.getTime();

	if (timeElapsed < 1000) {
		return `${timeElapsed}ms`;
	}

	const duration = intervalToDuration({
		start: 0,
		end: timeElapsed,
	});

	return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
}

export const MONTH_NAME = [
	"Janauary",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function periodToDateRange(period: Period) {
	const startDate = startOfMonth(new Date(period.year, period.month));
	const endDate = endOfMonth(new Date(period.year, period.month));

	return { startDate, endDate };
}

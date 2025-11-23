"use server";

import { periodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/types/analytics";
import {
	WorkflowExecutionStatus,
	WorkflowExecutionType,
} from "@/types/workflow";

import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";

/* -----------------------------------------------------------
   1. GET ALL PERIODS
------------------------------------------------------------ */
export async function getPeriods() {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const years = await prisma.workflowExecution.aggregate({
		where: { userId },
		_min: { startedAt: true },
	});

	const currentYear = new Date().getFullYear();

	const minYear = years._min.startedAt?.getFullYear() ?? currentYear;

	const periods: Period[] = [];

	for (let year = minYear; year <= currentYear; year++) {
		for (let month = 0; month < 12; month++) {
			periods.push({ year, month });
		}
	}

	return periods;
}

/* -----------------------------------------------------------
   2. STATS CARDS
------------------------------------------------------------ */
export async function getStatsCardsValue(period: Period) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			userId,
			startedAt: {
				gte: dateRange.startDate,
				lte: dateRange.endDate,
			},
			status: {
				in: [
					WorkflowExecutionStatus.COMPLETED,
					WorkflowExecutionStatus.FAILED,
				],
			},
		},
		select: {
			creditsConsumed: true,
			phases: {
				where: { creditsConsumed: { not: null } },
				select: { creditsConsumed: true },
			},
		},
	});

	const stats = {
		WorkflowExecutions: executions.length,
		creditsConsumed: 0,
		phaseExecutions: 0,
	};

	// Credits consumed (safe)
	stats.creditsConsumed = executions.reduce(
		(sum, execution) => sum + (execution.creditsConsumed ?? 0),
		0 satisfies number
	);

	stats.phaseExecutions = executions.reduce(
		(sum, execution) => sum + (execution.phases?.length ?? 0),
		0 satisfies number
	);

	return stats;
}

/* -----------------------------------------------------------
   3. DAILY EXECUTION STATUS
------------------------------------------------------------ */
export async function getWorkflowExecutionsStats(period: Period) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			userId,
			startedAt: {
				gte: dateRange.startDate,
				lte: dateRange.endDate,
			},
			status: {
				in: [
					WorkflowExecutionStatus.COMPLETED,
					WorkflowExecutionStatus.FAILED,
				],
			},
		},
	});

	type DailyCount = { success: number; failed: number };
	const stats: Record<string, DailyCount> = eachDayOfInterval({
		start: dateRange.startDate,
		end: dateRange.endDate,
	})
		.map((d) => format(d, "yyyy-MM-dd"))
		.reduce((acc, date) => {
			acc[date] = { success: 0, failed: 0 };
			return acc;
		}, {} as Record<string, DailyCount>);

	executions.forEach((execution) => {
		const startedAt = execution.startedAt;
		if (!startedAt) return;

		const date = format(startedAt, "yyyy-MM-dd");

		// ensure entry exists (type-checker happy and safe runtime)
		if (!stats[date]) stats[date] = { success: 0, failed: 0 };

		if (execution.status === WorkflowExecutionStatus.COMPLETED) {
			stats[date].success += 1;
		}

		if (execution.status === WorkflowExecutionStatus.FAILED) {
			stats[date].failed += 1;
		}
	});

	return Object.entries(stats).map(([date, info]) => ({
		date,
		...info,
	}));
}
/* -----------------------------------------------------------
   4. DAILY CREDITS USAGE
------------------------------------------------------------ */
export async function getCreditsUsageInPeriod(period: Period) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			userId,
			startedAt: {
				gte: dateRange.startDate,
				lte: dateRange.endDate,
			},
		},
	});

	type DailyCredits = { success: number; failed: number };
	const stats: Record<string, DailyCredits> = eachDayOfInterval({
		start: dateRange.startDate,
		end: dateRange.endDate,
	})
		.map((d) => format(d, "yyyy-MM-dd"))
		.reduce((acc, date) => {
			acc[date] = { success: 0, failed: 0 };
			return acc;
		}, {} as Record<string, DailyCredits>);

	executions.forEach((execution) => {
		if (!execution.startedAt) return;

		const date = format(execution.startedAt, "yyyy-MM-dd");
		const credits = execution.creditsConsumed ?? 0;

		// ensure entry exists
		if (!stats[date]) stats[date] = { success: 0, failed: 0 };

		if (execution.status === WorkflowExecutionStatus.COMPLETED) {
			stats[date].success += credits;
		}
		if (execution.status === WorkflowExecutionStatus.FAILED) {
			stats[date].failed += credits;
		}
	});

	return Object.entries(stats).map(([date, info]) => ({
		date,
		...info,
	}));
}

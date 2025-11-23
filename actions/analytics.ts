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
   1. GET ALL PERIODS (YEAR & MONTH COMBINATIONS)
------------------------------------------------------------ */
export async function getPeriods() {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const years = await prisma.workflowExecution.aggregate({
		where: { userId },
		_min: { startedAt: true },
	});

	const currentYear = new Date().getFullYear();
	const minYear = years._min.startedAt
		? years._min.startedAt.getFullYear()
		: currentYear;

	const periods: Period[] = [];

	for (let year = minYear; year <= currentYear; year++) {
		for (let month = 0; month < 12; month++) {
			periods.push({ year, month });
		}
	}

	return periods;
}

/* -----------------------------------------------------------
   2. STATS CARDS (EXECUTIONS COUNT / PHASE COUNT / CREDITS)
------------------------------------------------------------ */
export async function getStatsCardsValue(period: Period) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			userId,
			startedAt: { gte: dateRange.startDate, lte: dateRange.endDate },
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

	// Total workflow credits
	stats.creditsConsumed = executions.reduce<number>(
		(sum, execution) => sum + execution.creditsConsumed,
		0
	);

	// Total phase executions
	stats.phaseExecutions = executions.reduce<number>(
		(sum, execution) => sum + execution.phases.length,
		0
	);

	return stats;
}

/* -----------------------------------------------------------
   3. DAILY EXECUTION STATUS (SUCCESS / FAILED)
------------------------------------------------------------ */
export async function getWorkflowExecutionsStats(period: Period) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			userId,
			startedAt: { gte: dateRange.startDate, lte: dateRange.endDate },
			status: {
				in: [
					WorkflowExecutionStatus.COMPLETED,
					WorkflowExecutionStatus.FAILED,
				],
			},
		},
	});

	// Initialize empty stats for each day in the period
	const stats: WorkflowExecutionType = eachDayOfInterval({
		start: dateRange.startDate,
		end: dateRange.endDate,
	})
		.map((date) => format(date, "yyyy-MM-dd"))
		.reduce((acc, date) => {
			acc[date] = { success: 0, failed: 0 };
			return acc;
		}, {} as WorkflowExecutionType);

	executions.forEach((execution: (typeof executions)[number]) => {
		const date = format(execution.startedAt!, "yyyy-MM-dd");

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
   4. CREDITS USAGE PER DAY IN PERIOD
------------------------------------------------------------ */
export async function getCreditsUsageInPeriod(period: Period) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthenticated");

	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			userId,
			startedAt: { gte: dateRange.startDate, lte: dateRange.endDate },
		},
	});

	// Initialize credits stats for each day in the range
	const stats: WorkflowExecutionType = eachDayOfInterval({
		start: dateRange.startDate,
		end: dateRange.endDate,
	})
		.map((date) => format(date, "yyyy-MM-dd"))
		.reduce((acc, date) => {
			acc[date] = { success: 0, failed: 0 };
			return acc;
		}, {} as WorkflowExecutionType);

	executions.forEach((execution: (typeof executions)[number]) => {
		const date = format(execution.startedAt!, "yyyy-MM-dd");

		const credits = execution.creditsConsumed || 0;

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

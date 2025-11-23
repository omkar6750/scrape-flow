import { handleCheckoutSessionCompleted } from "@/lib/stripe/handleCheckoutSessionCompleted";
import { getStripe } from "@/lib/stripe/stripe"; // Changed from stripe to getStripe
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	// Check if Stripe is configured
	if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
		return new NextResponse("Stripe webhooks are disabled", {
			status: 503,
		});
	}

	const body = await request.text();

	const signatureHeaders = headers().get("stripe-signature") as string;

	try {
		const stripe = getStripe(); // Get Stripe instance lazily

		const event = stripe.webhooks.constructEvent(
			body,
			signatureHeaders,
			process.env.STRIPE_WEBHOOK_SECRET!
		);

		switch (event.type) {
			case "checkout.session.completed":
				handleCheckoutSessionCompleted(event.data.object);
				break;

			default:
				break;
		}

		return new NextResponse(null, { status: 200 });
	} catch (error) {
		return new NextResponse("webhook error", { status: 400 });
	}
}

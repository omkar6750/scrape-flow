import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
	if (!stripeInstance) {
		const apiKey = process.env.STRIPE_SECRET_KEY;
		if (!apiKey) {
			throw new Error(
				"STRIPE_SECRET_KEY is not configured. Stripe is disabled in demo mode."
			);
		}
		stripeInstance = new Stripe(apiKey, {
			apiVersion: "2025-10-29.clover",
			typescript: true,
		});
	}
	return stripeInstance;
}

// For backward compatibility, export a getter that throws if Stripe is not configured
export const stripe = new Proxy({} as Stripe, {
	get(_target, prop) {
		return getStripe()[prop as keyof Stripe];
	},
});

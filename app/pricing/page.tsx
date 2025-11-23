import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
	return (
		<div className="bg-background text-surface min-h-screen">
			<Navbar />

			{/* Hero Section */}
			<section className="w-full py-16 md:py-24 bg-background relative overflow-hidden mt-2">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
				>
					<div className="w-[600px] h-[350px] bg-green-400/60 blur-[120px] rounded-full mx-auto mt-24"></div>
					<div className="w-[900px] h-[600px] bg-green-600/40 blur-[160px] rounded-full mx-auto mt-40 absolute"></div>
				</div>
				<div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
					<h1 className="text-4xl sm:text-5xl font-semibold text-foreground">
						Simple,{" "}
						<span className="text-primary">Transparent</span>{" "}
						Pricing
					</h1>
					<p className="mt-6 text-lg text-muted-foreground max-w-2xl">
						Pay only for what you use. All plans include access to
						all features and modules. No hidden fees, no
						subscriptions.
					</p>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="py-20 px-6 sm:px-12">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<Card className="p-8 border-2">
							<div className="text-center">
								<h3 className="text-2xl font-bold text-foreground mb-2">
									Small Pack
								</h3>
								<div className="my-6">
									<span className="text-4xl font-bold text-primary">
										$9.99
									</span>
								</div>
								<p className="text-muted-foreground mb-6">
									1,000 Credits
								</p>
								<ul className="text-left space-y-3 mb-8 text-muted-foreground">
									<li>✓ All workflow modules</li>
									<li>✓ Unlimited workflows</li>
									<li>✓ Scheduled executions</li>
									<li>✓ Webhook delivery</li>
									<li>✓ AI-powered extraction</li>
								</ul>
								<Link href="/sign-up" className="block">
									<Button
										className="w-full"
										variant="outline"
									>
										Get Started
									</Button>
								</Link>
							</div>
						</Card>

						<Card className="p-8 border-2 border-primary">
							<div className="text-center">
								<div className="mb-2">
									<span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
										Most Popular
									</span>
								</div>
								<h3 className="text-2xl font-bold text-foreground mb-2">
									Medium Pack
								</h3>
								<div className="my-6">
									<span className="text-4xl font-bold text-primary">
										$39.99
									</span>
								</div>
								<p className="text-muted-foreground mb-6">
									5,000 Credits
								</p>
								<ul className="text-left space-y-3 mb-8 text-muted-foreground">
									<li>✓ All workflow modules</li>
									<li>✓ Unlimited workflows</li>
									<li>✓ Scheduled executions</li>
									<li>✓ Webhook delivery</li>
									<li>✓ AI-powered extraction</li>
									<li>✓ Priority support</li>
								</ul>
								<Link href="/sign-up" className="block">
									<Button className="w-full">
										Get Started
									</Button>
								</Link>
							</div>
						</Card>

						<Card className="p-8 border-2">
							<div className="text-center">
								<h3 className="text-2xl font-bold text-foreground mb-2">
									Large Pack
								</h3>
								<div className="my-6">
									<span className="text-4xl font-bold text-primary">
										$69.99
									</span>
								</div>
								<p className="text-muted-foreground mb-6">
									10,000 Credits
								</p>
								<ul className="text-left space-y-3 mb-8 text-muted-foreground">
									<li>✓ All workflow modules</li>
									<li>✓ Unlimited workflows</li>
									<li>✓ Scheduled executions</li>
									<li>✓ Webhook delivery</li>
									<li>✓ AI-powered extraction</li>
									<li>✓ Priority support</li>
									<li>✓ Best value</li>
								</ul>
								<Link href="/sign-up" className="block">
									<Button
										className="w-full"
										variant="outline"
									>
										Get Started
									</Button>
								</Link>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Credit System Explanation */}
			<section className="py-20 bg-surface px-6 sm:px-12">
				<div className="container mx-auto max-w-3xl">
					<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
						How Credits Work
					</h2>
					<div className="space-y-6">
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Pay Per Use
							</h3>
							<p className="text-muted-foreground">
								Each module in your workflow consumes a certain
								number of credits when executed. Credits are
								only deducted when workflows run, not when you
								create or edit them.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Credit Costs
							</h3>
							<p className="text-muted-foreground mb-4">
								Different modules have different credit costs:
							</p>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>Launch Browser: 5 credits</li>
								<li>Extract Text: 2 credits</li>
								<li>Extract Data with AI: 4 credits</li>
								<li>User Interactions: 1-2 credits each</li>
								<li>Data Processing: 1 credit each</li>
							</ul>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								No Expiration
							</h3>
							<p className="text-muted-foreground">
								Credits never expire. Use them at your own pace.
								Buy more credits whenever you need them, or set
								up automatic recharge when your balance gets
								low.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Free Credits for New Users
							</h3>
							<p className="text-muted-foreground">
								New users receive 5,000 free credits to get
								started. No credit card required. Try all
								features and build your first workflows
								completely free.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-20 px-6 sm:px-12">
				<div className="container mx-auto max-w-3xl">
					<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
						Frequently Asked Questions
					</h2>
					<div className="space-y-6">
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Do I need a subscription?
							</h3>
							<p className="text-muted-foreground">
								No! ScrapeFlow uses a pay-as-you-go credit
								system. Buy credits when you need them, no
								monthly subscriptions required.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								What happens if I run out of credits?
							</h3>
							<p className="text-muted-foreground">
								Your workflows will pause until you purchase
								more credits. You can set up automatic recharge
								to ensure continuous operation.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Can I get a refund?
							</h3>
							<p className="text-muted-foreground">
								Credits are non-refundable, but they never
								expire. Use them whenever you need them.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Are there any limits?
							</h3>
							<p className="text-muted-foreground">
								No limits on the number of workflows you can
								create or the complexity of your automation. The
								only limit is your credit balance.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 bg-primary text-white text-center">
				<h2 className="text-3xl sm:text-4xl font-bold">
					Ready to Get Started?
				</h2>
				<p className="mt-4 text-lg">
					Sign up today and get 5,000 free credits. No credit card
					needed.
				</p>
				<div className="mt-8">
					<Link href="/sign-up">
						<Button variant="secondary" size="lg">
							Start Free Trial
						</Button>
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 bg-surface text-surface-500 text-center">
				<p>© 2025 Scrapeflow. All rights reserved.</p>
			</footer>
		</div>
	);
}

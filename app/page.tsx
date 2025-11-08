import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
	return (
		<div className="bg-background text-surface">
			<Navbar />

			{/* Hero */}
			<section className="w-full py-16 md:py-24 bg-background relative overflow-hidden rounded-2xl md:rounded-3xl mt-2 h-full">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
				>
					{/* Smaller green orb */}
					<div className="w-[600px] h-[350px] bg-green-400/60 blur-[120px] rounded-full mx-auto mt-24"></div>
					{/* Larger blue-green orb */}
					<div className="w-[900px] h-[600px] bg-green-600/40 blur-[160px] rounded-full mx-auto mt-40 absolute"></div>
				</div>
				<div className=" container relative z-10 mx-auto px-4 text-center flex flex-col items-center ">
					<h1 className=" text-4xl sm:text-5xl font-semibold text-foreground">
						Web <span className="text-primary">Scraping</span> made
						Easy. <br /> Automate with
						<span className="text-primary"> Drag and Drop</span>
						Workflows
					</h1>
					<div className="mt-8 space-x-6">
						<Button size="lg">Get Started Now</Button>
						<Button size="lg" variant={"outline"} className="">
							How it works
						</Button>
					</div>
					<div className="mt-32 rounded-xl max-w-6xl p-3 bg-white bg-opacity-10 ">
						<Image
							src="/homePage/Dashboard Image.webp"
							alt="Scrapeflow Dashboard"
							width={1200}
							height={600}
							className="mx-auto rounded-xl"
						/>
					</div>
				</div>
			</section>

			{/* Trust / Partners */}
			<section className="py-16 bg-surface text-center">
				<p className="text-sm uppercase text-muted-foreground tracking-wide mb-8">
					Over 50+ businesses trust us
				</p>
				<div className="flex flex-wrap justify-center items-center gap-8 px-6 sm:px-12">
					<Image
						src="/homePage/StripeLogo.webp"
						alt="Stripe"
						width={120}
						height={40}
					/>
					<Image
						src="/homePage/IntelLogo.webp"
						alt="Intel"
						width={120}
						height={40}
					/>
					<Image
						src="/homePage/SAPLogo.webp"
						alt="SAP"
						width={120}
						height={40}
					/>
					<Image
						src="/homePage/ZOOMLogo.webp"
						alt="Zoom"
						width={120}
						height={40}
					/>
				</div>
			</section>

			{/* Why Choose Us / Features */}
			<section className="py-20 px-6 sm:px-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center">
					Built for Real World Web Scraping Needs
				</h2>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12">
					<Card className="text-center flex items-center justify-center flex-col p-5">
						<h3 className="text-2xl font-semibold text-foreground">
							Increased Productivity
						</h3>
						<p className="mt-2 text-base text-muted-foreground text-surface-500">
							Automate complex web scraping tasks and save
							valuable time.
						</p>
					</Card>
					<Card className="text-center flex items-center justify-center flex-col p-5">
						<h3 className="text-2xl font-semibold text-foreground ">
							AI Powered Workflows
						</h3>
						<p className="mt-2 text-base text-muted-foreground text-surface-500">
							Leverage AI to manage and manipulate your data
							during the scraping process.
						</p>
					</Card>
					<Card className="text-center flex items-center justify-center flex-col p-5">
						<h3 className="text-2xl font-semibold text-foreground ">
							Automated Workflows
						</h3>
						<p className="mt-2 text-base text-muted-foreground text-surface-500">
							Build automated workflows that run on your schedule.
						</p>
					</Card>
				</div>
			</section>

			{/* Use Cases */}
			<section className="py-20 bg-surface px-6 sm:px-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
					Discover Powerful Use Cases for Data Automation
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
					<div className="flex flex-col items-center text-center max-w-3xl">
						<Image
							src="/homePage/Home-OurFeatures-1-Graph.webp"
							alt="Track Product Prices"
							width={500}
							height={300}
						/>
						<h3 className="mt-4 text-2xl font-semibold text-foreground">
							Track Product Prices
						</h3>
						<p className="mt-2 text-base text-muted-foreground">
							Build powerful scraping workflows with zero code.
							Use visual widgets to automate navigation, clicks,
							and text extraction.
						</p>
					</div>

					<div className="flex flex-col items-center text-center max-w-3xl">
						<Image
							src="/homePage/Home-OurFeatures-2-JobListing.webp"
							alt="Scrape Job Listings"
							width={500}
							height={300}
						/>
						<h3 className="mt-4 text-2xl font-semibold text-foreground">
							Scrape Job Listings
						</h3>
						<p className="mt-2 text-base text-muted-foreground">
							Aggregate job postings from multiple sources to
							create a comprehensive job board or recruitment
							database.
						</p>
					</div>

					<div className="flex flex-col items-center text-center max-w-3xl">
						<Image
							src="/homePage/Home-OurFeatures-3-Competitor.webp"
							alt="Monitor Competitors"
							width={500}
							height={300}
						/>
						<h3 className="mt-4 text-2xl font-semibold text-foreground">
							Monitor Competitors
						</h3>
						<p className="mt-2 text-base text-muted-foreground">
							Keep track of competitor websites, product launches,
							and marketing strategies to stay ahead in your
							market.
						</p>
					</div>

					<div className="flex flex-col items-center text-center max-w-3xl">
						<Image
							src="/homePage/Home-OurFeatures-4-Results.webp"
							alt="See Results in Real Time"
							width={500}
							height={300}
						/>
						<h3 className="mt-4 text-2xl font-semibold text-foreground">
							See Results in Real Time
						</h3>
						<p className="mt-2 text-base text-muted-foreground">
							View extracted data as it comes in, with real-time
							updates for important changes.
						</p>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-6 sm:px-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
					What Our Users Say About Their Experience
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
					{/* Repeat testimonial cards */}
					<Card className="p-5 flex flex-col h-fit">
						<div className="w-full h-fit pb-5 items-center justify-start space-x-6 flex">
							<Avatar>
								<AvatarImage
									src="/homePage/Testimonial-Male-3.webp"
									alt="Chris Anderson"
									className="rounded-full mx-auto"
								/>
							</Avatar>
							<div className="flex flex-col items-start justify-center w-fit">
								<h4 className="text-xl font-semibold text-foreground">
									Chris Anderson
								</h4>
								<p className="text-sm text-muted-foreground">
									Data Scientist
								</p>
							</div>
						</div>
						<blockquote className="text-base text-left font-extralight italic">
							"ScrapeFlow has completely transformed our data
							collection process. What used to take days now takes
							minutes."
						</blockquote>
					</Card>

					<Card className="p-5 flex flex-col h-fit">
						<div className="w-full h-fit pb-5 items-center justify-start space-x-6 flex">
							<Avatar>
								<AvatarImage
									src="/homePage/Testimonial-Male-2.webp"
									alt="David Roth"
									className="rounded-full mx-auto"
								/>
							</Avatar>
							<div className="flex flex-col items-start justify-center w-fit">
								<h4 className="text-xl font-semibold text-foreground">
									David Roth
								</h4>
								<p className="text-sm text-muted-foreground">
									CTO
								</p>
							</div>
						</div>
						<blockquote className="text-base text-left font-extralight italic">
							"ScrapeFlow has helped us stay competitive by
							monitoring prices across hundreds of websites
							automatically."
						</blockquote>
					</Card>

					<Card className="p-5 flex flex-col h-fit">
						<div className="w-full h-fit pb-5 items-center justify-start space-x-6 flex">
							<Avatar>
								<AvatarImage
									src="/homePage/Testimonial-Female-1.webp"
									alt="Sarah Lai"
									className="rounded-full mx-auto"
								/>
							</Avatar>
							<div className="flex flex-col items-start justify-center w-fit">
								<h4 className="text-xl font-semibold text-foreground">
									Sarah Lai
								</h4>
								<p className="text-sm text-muted-foreground">
									Marketing Director
								</p>
							</div>
						</div>
						<blockquote className="text-base text-left font-extralight italic">
							"The ease of use and powerful features make
							ScrapeFlow the perfect tool for our market research
							needs."
						</blockquote>
					</Card>

					<Card className="p-5 flex flex-col h-fit">
						<div className="w-full h-fit pb-5 items-center justify-start space-x-6 flex">
							<Avatar>
								<AvatarImage
									src="/homePage/Testimonial-Female-2.webp"
									alt="Emily Chen"
									className="rounded-full mx-auto"
								/>
							</Avatar>
							<div className="flex flex-col items-start justify-center w-fit">
								<h4 className="text-xl font-semibold text-foreground">
									Emily Chen
								</h4>
								<p className="text-sm text-muted-foreground">
									Data Scientist
								</p>
							</div>
						</div>
						<blockquote className="text-base text-left font-extralight italic">
							"We've tried many scraping tools, but ScrapeFlow is
							by far the most reliable and easiest to use."
						</blockquote>
					</Card>

					<Card className="p-5 flex flex-col h-fit">
						<div className="w-full h-fit pb-5 items-center justify-start space-x-6 flex">
							<Avatar>
								<AvatarImage
									src="/homePage/Testimonial-Male-1.webp"
									alt="Chris Anderson"
									className="rounded-full mx-auto"
								/>
							</Avatar>
							<div className="flex flex-col items-start justify-center w-fit">
								<h4 className="text-xl font-semibold text-foreground">
									Chris Anderson
								</h4>
								<p className="text-sm text-muted-foreground">
									Lead Developer
								</p>
							</div>
						</div>
						<blockquote className="text-base text-left font-extralight italic">
							"The no-code approach saves us countless development
							hours while still giving us the flexibility we
							need."
						</blockquote>
					</Card>

					<Card className="p-5 flex flex-col h-fit">
						<div className="w-full h-fit pb-5 items-center justify-start space-x-6 flex">
							<Avatar>
								<AvatarImage
									src="/homePage/Testimonial-Female-3.webp"
									alt="Linda Rossman"
									className="rounded-full mx-auto"
								/>
							</Avatar>
							<div className="flex flex-col items-start justify-center w-fit">
								<h4 className="text-xl font-semibold text-foreground">
									Linda Rossman
								</h4>
								<p className="text-sm text-muted-foreground">
									Research Analyst
								</p>
							</div>
						</div>
						<blockquote className="text-base text-left font-extralight italic">
							"The data quality and reliability of ScrapeFlow is
							unmatched. It's become an essential part of our
							toolkit."
						</blockquote>
					</Card>

					{/* Add other testimonials similarly */}
				</div>
			</section>

			{/* CTA Footer */}
			<section className="py-16 bg-primary text-white text-center">
				<h2 className="text-3xl sm:text-4xl font-bold">
					Ready to Take Control of Your Web Scraping?
				</h2>
				<p className="mt-4 text-lg">
					Sign up today and launch your first scraping workflows with
					100 free credits. No credit card needed.
				</p>
				<div className="mt-8">
					<Button variant="secondary" size="lg">
						Start Free Trial
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 bg-surface text-surface-500 text-center">
				<p>© 2025 Scrapeflow. All rights reserved.</p>
			</footer>
		</div>
	);
}

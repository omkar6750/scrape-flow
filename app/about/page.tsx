import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
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
						About <span className="text-primary">ScrapeFlow</span>
					</h1>
					<p className="mt-6 text-lg text-muted-foreground max-w-2xl">
						ScrapeFlow is a powerful no-code web scraping platform
						that allows you to automate data collection with
						drag-and-drop workflows. Build complex scraping
						operations without writing a single line of code.
					</p>
				</div>
			</section>

			{/* What You Can Do */}
			<section className="py-20 px-6 sm:px-12">
				<div className="container mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
						What You Can Do
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Automate Data Collection
							</h3>
							<p className="text-muted-foreground">
								Collect data from websites automatically on a
								schedule. Set up workflows that run daily,
								weekly, or on-demand to gather the information
								you need.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Monitor Competitors
							</h3>
							<p className="text-muted-foreground">
								Track competitor prices, product launches, and
								marketing strategies. Stay ahead of the
								competition with automated monitoring workflows.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Extract Structured Data
							</h3>
							<p className="text-muted-foreground">
								Use AI-powered extraction to pull structured
								data from unstructured web pages. Transform
								messy HTML into clean, usable JSON data.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Build Job Boards
							</h3>
							<p className="text-muted-foreground">
								Aggregate job listings from multiple sources
								into a single comprehensive database. Keep your
								job board updated automatically.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Track Product Prices
							</h3>
							<p className="text-muted-foreground">
								Monitor e-commerce sites for price changes. Get
								notified when products go on sale or prices drop
								below your threshold.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Real-time Data Delivery
							</h3>
							<p className="text-muted-foreground">
								Send extracted data directly to your systems via
								webhooks. Integrate seamlessly with your
								existing tools and workflows.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* Modules Section */}
			<section className="py-20 bg-surface px-6 sm:px-12">
				<div className="container mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
						Available Modules
					</h2>

					{/* Browser Control */}
					<div className="mb-12">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							Browser Control
						</h3>
						<Card className="p-6">
							<h4 className="text-xl font-semibold text-foreground mb-3">
								Launch Browser
							</h4>
							<p className="text-muted-foreground mb-4">
								The entry point for all workflows. Launches a
								browser instance and navigates to a specified
								URL. This module creates a browser session that
								other modules can use to interact with web
								pages.
							</p>
							<p className="text-sm text-muted-foreground">
								<strong>How to use:</strong> Add this as the
								first module in your workflow. Enter the target
								website URL (e.g., https://example.com). The
								browser instance output can be connected to
								other modules that need to interact with the
								page.
							</p>
							<p className="text-sm text-muted-foreground mt-2">
								<strong>Cost:</strong> 5 credits per execution
							</p>
						</Card>
					</div>

					{/* Data Extraction */}
					<div className="mb-12">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							Data Extraction
						</h3>
						<div className="space-y-6">
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Page to HTML
								</h4>
								<p className="text-muted-foreground mb-4">
									Converts the current browser page into HTML
									content. Use this to capture the full HTML
									structure of a page for further processing.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect a
									browser instance to this module. It will
									output the HTML content of the page, which
									can then be used by text extraction or AI
									extraction modules.
								</p>
							</Card>
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Extract Text from HTML
								</h4>
								<p className="text-muted-foreground mb-4">
									Extracts plain text from HTML elements using
									CSS selectors. Perfect for getting text
									content from specific elements on a page.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect HTML
									content to the input. Provide a CSS selector
									(e.g., &quot;.title&quot;,
									&quot;#price&quot;, &quot;h1&quot;) to
									target the element you want to extract. The
									extracted text will be available as output
									for other modules.
								</p>
								<p className="text-sm text-muted-foreground mt-2">
									<strong>Cost:</strong> 2 credits per
									execution
								</p>
							</Card>
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Extract Data with AI
								</h4>
								<p className="text-muted-foreground mb-4">
									Uses AI to intelligently extract structured
									data from unstructured content. Perfect for
									complex extraction tasks where CSS selectors
									aren&apos;t enough.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect content
									(HTML or text) to the input. Provide your
									API credentials and write a prompt
									describing what data you want to extract.
									The AI will return structured JSON data
									based on your prompt.
								</p>
								<p className="text-sm text-muted-foreground mt-2">
									<strong>Cost:</strong> 4 credits per
									execution
								</p>
							</Card>
						</div>
					</div>

					{/* User Interactions */}
					<div className="mb-12">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							User Interactions
						</h3>
						<div className="space-y-6">
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Fill Input
								</h4>
								<p className="text-muted-foreground mb-4">
									Fills text input fields, textareas, or
									search boxes on a web page. Use this to
									automate form submissions or search queries.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect a
									browser instance. Provide a CSS selector for
									the input field and the text you want to
									fill in. This is commonly used before
									clicking a submit button.
								</p>
							</Card>
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Click Element
								</h4>
								<p className="text-muted-foreground mb-4">
									Clicks on buttons, links, or any clickable
									element on a page. Essential for navigating
									through websites or triggering actions.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect a
									browser instance. Provide a CSS selector for
									the element you want to click. Use this to
									navigate pages, submit forms, or trigger
									JavaScript actions.
								</p>
							</Card>
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Press Key
								</h4>
								<p className="text-muted-foreground mb-4">
									Simulates keyboard key presses. Useful for
									shortcuts, closing modals (ESC), or
									submitting forms (Enter).
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect a
									browser instance. Specify which key to press
									(e.g., &quot;Enter&quot;,
									&quot;Escape&quot;, &quot;Tab&quot;). This
									is useful for keyboard shortcuts or
									dismissing popups.
								</p>
							</Card>
						</div>
					</div>

					{/* Timing Controls */}
					<div className="mb-12">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							Timing Controls
						</h3>
						<Card className="p-6">
							<h4 className="text-xl font-semibold text-foreground mb-3">
								Wait for Element
							</h4>
							<p className="text-muted-foreground mb-4">
								Pauses the workflow until a specific element
								appears on the page. Essential for handling
								dynamic content that loads asynchronously.
							</p>
							<p className="text-sm text-muted-foreground">
								<strong>How to use:</strong> Connect a browser
								instance. Provide a CSS selector for the element
								you&apos;re waiting for. The workflow will pause
								until that element is visible, preventing errors
								from trying to interact with content that
								hasn&apos;t loaded yet.
							</p>
						</Card>
					</div>

					{/* Data Storage */}
					<div className="mb-12">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							Data Storage
						</h3>
						<div className="space-y-6">
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Read Property from JSON
								</h4>
								<p className="text-muted-foreground mb-4">
									Extracts a specific property value from a
									JSON object. Use this to access nested data
									or filter specific fields from complex JSON
									structures.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect JSON
									data to the input. Specify the property path
									(e.g., &quot;user.name&quot; for nested
									objects). The value will be extracted and
									available for other modules.
								</p>
							</Card>
							<Card className="p-6">
								<h4 className="text-xl font-semibold text-foreground mb-3">
									Add Property to JSON
								</h4>
								<p className="text-muted-foreground mb-4">
									Adds or updates a property in a JSON object.
									Useful for building structured data from
									multiple sources or enriching existing data.
								</p>
								<p className="text-sm text-muted-foreground">
									<strong>How to use:</strong> Connect JSON
									data to the input. Specify the property name
									and value to add. This is useful for
									combining data from multiple extraction
									steps into a single JSON object.
								</p>
							</Card>
						</div>
					</div>

					{/* Result Delivery */}
					<div className="mb-12">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							Result Delivery
						</h3>
						<Card className="p-6">
							<h4 className="text-xl font-semibold text-foreground mb-3">
								Deliver via Webhook
							</h4>
							<p className="text-muted-foreground mb-4">
								Sends extracted data to an external URL via HTTP
								POST request. Perfect for integrating with your
								own systems, databases, or third-party services.
							</p>
							<p className="text-sm text-muted-foreground">
								<strong>How to use:</strong> Connect the data
								you want to send (usually JSON). Provide the
								webhook URL where you want to receive the data.
								The data will be sent as a POST request with
								JSON payload. Use this to send results to your
								database, API, or notification service.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 px-6 sm:px-12">
				<div className="container mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
						How to Build a Workflow
					</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								1. Start with Launch Browser
							</h3>
							<p className="text-muted-foreground">
								Every workflow begins with the Launch Browser
								module. This creates a browser session and
								navigates to your target website.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								2. Add Interaction Modules
							</h3>
							<p className="text-muted-foreground">
								Use Fill Input, Click Element, or Press Key to
								interact with the page. Connect these modules in
								sequence to navigate through the website.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								3. Extract Data
							</h3>
							<p className="text-muted-foreground">
								Once you&apos;re on the right page, use
								extraction modules to get the data you need. Use
								Extract Text for simple extractions or Extract
								Data with AI for complex structures.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								4. Process and Store Data
							</h3>
							<p className="text-muted-foreground">
								Use JSON modules to structure your data, combine
								multiple extractions, or transform the format.
							</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								5. Deliver Results
							</h3>
							<p className="text-muted-foreground">
								Finally, use Deliver via Webhook to send your
								extracted data to your systems, databases, or
								APIs.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 bg-surface text-surface-500 text-center">
				<p>© 2025 Scrapeflow. All rights reserved.</p>
			</footer>
		</div>
	);
}

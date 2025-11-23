import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ScrapeFlow",
	description: "The ultimate web scraping and automation platform",
	icons: [
		{
			url: "/favicon/web-app-manifest-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			url: "/favicon/web-app-manifest-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			afterSignOutUrl={"/sign-in"}
			appearance={{
				elements: {
					formButtonPrimary:
						"bg-primary hover:bg-primary/90 text-sm !shadow-none",
				},
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<AppProviders>{children}</AppProviders>
					<Toaster richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}

"use client";

import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
const Navbar = () => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	const pathname = usePathname();

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const controlNavbar = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", controlNavbar);
		return () => window.removeEventListener("scroll", controlNavbar);
	}, []);
	const navLinks = [
		{ href: "/home", label: "Home" },
		{ href: "/about", label: "About" },
		{ href: "/pricing", label: "Pricing" },
		{ href: "/features", label: "Features" },
	];
	return (
		<nav
			className={`bg-background/70 fixed z-50 w-full border-b shadow-md transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<div className="w-full px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<div className="flex h-16 items-center justify-between">
					<Logo />
					<div className="flex w-full items-center justify-end md:justify-center">
						<div className="hidden items-center space-x-8 md:flex">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`muted-foreground  rounded-md px-3 py-2 hover:text-primary font-semibold transition-colors ${
										pathname === link.href
											? "text-primary unde underline underline-offset-5"
											: ""
									}`}
								>
									{link.label}
								</Link>
							))}
						</div>
						<div className="flex items-center md:hidden">
							<Button
								variant={"outline"}
								onClick={() =>
									setIsMobileMenuOpen(!isMobileMenuOpen)
								}
							>
								{!isMobileMenuOpen ? <MenuIcon /> : <X />}
							</Button>
						</div>
					</div>
					{/* signup | signin */}
					<div className="flex gap-5">
						<Button variant={"outline"}>
							<SignInButton></SignInButton>
						</Button>
						<Button>
							<SignUpButton></SignUpButton>
						</Button>
					</div>
				</div>

				{/* mobile nav menu */}

				<div
					className={`transition-all duration-300 ease-in-out md:hidden ${
						isMobileMenuOpen
							? "max-h-64 opacity-100"
							: "max-h-0 overflow-hidden opacity-0"
					}`}
				>
					<div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
						{navLinks.map((link) => (
							<Link
								href={link.href}
								key={link.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className=""
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

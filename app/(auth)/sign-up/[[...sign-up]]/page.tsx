import Logo from "@/components/Logo";
import { SignUp } from "@clerk/nextjs";
function page() {
	return (
		<div className="flex items-center justify-center min-h-screen ">
			<div className="flex flex-col items-center w-full max-w-md p-8 bg-[#121212] rounded-2xl shadow-xl">
				{/* Custom Logo */}
				<Logo />

				{/* Custom heading */}
				<h2 className="text-white text-lg font-semibold text-center mt-2">
					Create your account
				</h2>
				<p className="text-gray-400 text-sm text-center mb-6">
					Welcome! Please fill in the details to get started.
				</p>

				{/* Clerk Sign Up Form */}
				<div className="w-full">
					<SignUp
						appearance={{
							elements: {
								formButtonPrimary:
									"bg-[#00FF75] text-black font-semibold hover:opacity-90 transition rounded-md py-2",
								footerActionLink:
									"text-[#00FF75] hover:underline",
								socialButtonsBlockButton:
									"border border-gray-700 text-white hover:bg-gray-800",
								card: "bg-[#121212] border-0 shadow-none",
								headerTitle: "hidden",
								headerSubtitle: "hidden",
								formFieldLabel: "text-gray-300 text-sm mb-1",
								formFieldInput:
									"bg-[#1E1E1E] border border-gray-700 text-white rounded-md focus:ring-[#00FF75] focus:border-[#00FF75]",
								dividerLine: "bg-gray-700",
								dividerText: "text-gray-400",
							},
							layout: {
								socialButtonsVariant: "blockButton",
								showOptionalFields: false,
							},
							variables: {
								colorPrimary: "#00FF75",
								colorText: "#FFFFFF",
								colorBackground: "#121212",
								fontSize: "14px",
								borderRadius: "8px",
							},
						}}
						signInUrl="/sign-in"
					/>
				</div>

				<p className="text-gray-500 text-xs mt-8">
					Secured by{" "}
					<span className="text-gray-300 font-medium">Clerk</span>
				</p>
			</div>
		</div>
	);
}
export default page;

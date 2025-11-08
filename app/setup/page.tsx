import { setupUser } from "@/actions/billing/billing";

async function SetupPage() {
	return await setupUser();
}

export default SetupPage;

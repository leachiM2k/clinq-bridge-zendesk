export interface IOAuth2Options {
	ZENDESK_CLIENT_ID: string;
	ZENDESK_CLIENT_SECRET: string;
	ZENDESK_REDIRECT_URL: string;
	ZENDESK_BASE_URL: string;
}

export default function parseEnvironment(): IOAuth2Options {
	const { ZENDESK_CLIENT_ID, ZENDESK_CLIENT_SECRET, ZENDESK_REDIRECT_URL, ZENDESK_BASE_URL } = process.env;

	if (!ZENDESK_CLIENT_ID) {
		throw new Error("Missing client ID in environment.");
	}

	if (!ZENDESK_CLIENT_SECRET) {
		throw new Error("Missing client secret in environment.");
	}

	if (!ZENDESK_REDIRECT_URL) {
		throw new Error("Missing redirect url in environment.");
	}

	if (!ZENDESK_BASE_URL) {
		throw new Error("Missing base URL in environment.");
	}

	return {
		ZENDESK_CLIENT_ID,
		ZENDESK_CLIENT_SECRET,
		ZENDESK_REDIRECT_URL,
		ZENDESK_BASE_URL
	};
}

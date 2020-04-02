# CLINQ CRM-Bridge for Zendesk

This service provides contacts from Zendesk for the CLINQ app.

## Prerequisites

Please create `.env` file or provide following environment variables:

- OAUTH_IDENTIFIER - Name of CRM Bridge
- ZENDESK_CLIENT_ID - Unique Identifier of registered Zendesk OAuth Client (for local integration see https://<your-instance>.zendesk.com/agent/admin/api/oauth_clients/)
- ZENDESK_CLIENT_SECRET - Client Secret of registered Zendesk OAuth Client, provided by Zendesk
- ZENDESK_REDIRECT_URL - URL of current bridge, must match with registered data at Zendesk
- ZENDESK_BASE_URL - URL of your Zendesk instance 

## License

[Apache 2.0](LICENSE)

import axios from 'axios';
import { IZendeskAuthResponse } from './interfaces';
import parseEnvironment from './parse-environment';

export async function getTokens(code: string): Promise<IZendeskAuthResponse> {
    const { ZENDESK_CLIENT_ID, ZENDESK_CLIENT_SECRET, ZENDESK_REDIRECT_URL, ZENDESK_BASE_URL } = parseEnvironment();
    const payload = {
        code,
        redirect_uri: ZENDESK_REDIRECT_URL,
        client_id: ZENDESK_CLIENT_ID,
        client_secret: ZENDESK_CLIENT_SECRET,
        grant_type: 'authorization_code',
        scope: 'read'
    };

    const response = await axios.post<IZendeskAuthResponse>(`${ZENDESK_BASE_URL}/oauth/tokens`, payload);

    if (!response || response.status !== 200) {
        return Promise.reject(`Error in Zendesk response: ${response.statusText}`);
    }

    return response.data;
}

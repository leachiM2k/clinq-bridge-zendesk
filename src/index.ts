import {
  Adapter,
  Config,
  Contact,
  ContactTemplate,
  ContactUpdate,
  ServerError,
  start
} from "@clinq/bridge";
import dotenv from "dotenv";
import { Request } from "express";
import { getTokens } from './util/access-token';
import { anonymizeKey } from './util/anonymize-key';
import { createContact, deleteContact, getContacts, getOAuth2RedirectUrl, updateContact } from "./util/zendesk";

dotenv.config();

class ZendeskAdapter implements Adapter {
  /**
   * validates required config parameters and throws errors
   * @param {Config} config
   * @throws
   */
  private static validateAndReturnRequiredConfigKeys(config: Config): {apiKey: string} {
    const apiKey = config.apiKey;
    if (!apiKey) {
      throw new ServerError(400, 'No server key provided');
    }

    return { apiKey };
  }

  public async getContacts(config: Config): Promise<Contact[]> {
    const { apiKey } = ZendeskAdapter.validateAndReturnRequiredConfigKeys(config);
    try {
      return await getContacts(apiKey);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Could not get contacts for key "${anonymizeKey(apiKey)}"`, error.message);
      throw new ServerError(401, "Unauthorized");
    }
  }

  public async createContact(config: Config, contact: ContactTemplate): Promise<Contact> {
    const { apiKey } = ZendeskAdapter.validateAndReturnRequiredConfigKeys(config);
    try {
      return createContact(apiKey, contact);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Could not create contact for key "${anonymizeKey(apiKey)}: ${error.message}"`);
      throw new ServerError(500, "Could not create contact");
    }
  }
  public async updateContact(config: Config, id: string, contact: ContactUpdate): Promise<Contact> {
    const { apiKey } = ZendeskAdapter.validateAndReturnRequiredConfigKeys(config);
    try {
      return updateContact(apiKey, contact);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Could not update contact for key "${anonymizeKey(apiKey)}: ${error.message}"`);
      throw new ServerError(500, "Could not update contact");
    }
  }
  public async deleteContact(config: Config, id: string): Promise<void> {
    const { apiKey } = ZendeskAdapter.validateAndReturnRequiredConfigKeys(config);
    try {
      return deleteContact(apiKey, id);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Could not update contact for key "${anonymizeKey(apiKey)}: ${error.message}"`);
      throw new ServerError(500, "Could not update contact");
    }
  }
  /**
   * REQUIRED FOR OAUTH2 FLOW
   * Return the redirect URL for the given contacts provider.
   * Users will be redirected here to authorize CLINQ.
   */
  public async getOAuth2RedirectUrl(): Promise<string> {
    return getOAuth2RedirectUrl();
  }

  /**
   * REQUIRED FOR OAUTH2 FLOW
   * Users will be redirected here after authorizing CLINQ.
   */
  public async handleOAuth2Callback(req: Request): Promise<{ apiKey: string; apiUrl: string }> {
    if (req.query.error) {
      throw new Error('Access denied to Zendesk');
    }
    const { code } = req.query;
    const { access_token } = await getTokens(code);
    return {
      apiKey: `${access_token}`,
      apiUrl: ''
    };
  }

}

start(new ZendeskAdapter());

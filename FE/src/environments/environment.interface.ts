export interface Environment {
  production: boolean;
  auth: {
    enabled: boolean;
    clientId: string;
    authority: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
    scopes: string[];
    apiUri: string;
  };
  airtable: {
    baseId: string;
    apiKey: string;
    tableName: string;
    enabled: boolean;
  };
}

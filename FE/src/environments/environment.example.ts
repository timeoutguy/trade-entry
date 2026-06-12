import { Environment } from './environment.interface';

// Copy to environment.ts for local development.
// Copy and adjust for environment.prod.ts (production: true, prod redirect URIs).
export const environment: Environment = {
  production: false,
  auth: {
    enabled: false,
    clientId: '',
    authority: 'https://login.microsoftonline.com/{tenant-id}',
    redirectUri: 'http://localhost:4200/redirect',
    postLogoutRedirectUri: 'http://localhost:4200',
    scopes: ['openid', 'profile', 'email'],
    apiUri: '',
  },
  airtable: {
    baseId: '',
    apiKey: '',
    tableName: 'Trades',
    enabled: false,
  },
};

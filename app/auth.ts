import { readFileSync } from 'fs';

import { createAppAuth } from '@octokit/auth-app';

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID || 0,
  privateKey: readFileSync("pkcs8-key.pem", "utf-8"),
  clientId: process.env.GITHUB_APP_CLIENT_ID,
  clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
});

export async function getInstallationAccessToken(installationId: string) {
  const installationAccessToken = await auth({
    type: "installation",
    installationId,
  });
  return installationAccessToken.token;
}

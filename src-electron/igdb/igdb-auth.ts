let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function fetchNewToken(): Promise<{ accessToken: string; expiresAt: number }> {
  const clientId = process.env.IGDB_CLIENT_ID!;
  const clientSecret = process.env.IGDB_CLIENT_SECRET!;

  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    throw new Error(`Échec récupération token IGDB : ${response.status}`);
  }

  const data = await response.json() as { access_token: string; expires_in: number };

  return {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - 60_000,
  };
}

export async function getIgdbToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }

  cachedToken = await fetchNewToken();
  return cachedToken.accessToken;
}

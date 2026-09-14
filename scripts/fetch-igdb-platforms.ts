import 'dotenv/config'
import { getIgdbToken } from "../src-electron/igdb/igdb-auth";
import { writeFileSync } from 'fs';

const token = await getIgdbToken()
const clientId = process.env.IGDB_CLIENT_ID!

const body = `fields id, name, abbreviation; sort id asc; limit 500;`;

const response = await fetch('https://api.igdb.com/v4/platforms', {
  method: 'POST',
  headers: {
    'Client-ID': clientId,
    'Authorization': `Bearer ${token}`,
  },
  body,
});

const platforms = await response.json();
writeFileSync('igdb-debug-files/platforms-debug.json', JSON.stringify(platforms, null, 2));

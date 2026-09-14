import 'dotenv/config'
import { getIgdbToken } from "../src-electron/igdb/igdb-auth";
import { writeFileSync } from 'fs';

const token = await getIgdbToken()
const clientId = process.env.IGDB_CLIENT_ID!

const body = `fields id, type; sort id asc; limit 500;`;

const response = await fetch('https://api.igdb.com/v4/game_types', {
  method: 'POST',
  headers: {
    'Client-ID': clientId,
    'Authorization': `Bearer ${token}`,
  },
  body,
});

const game_types = await response.json();
writeFileSync('igdb-debug-files/game_types.json', JSON.stringify(game_types, null, 2));

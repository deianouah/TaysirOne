const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

async function main() {
  const envContent = fs.readFileSync('.env', 'utf8');
  const dbUrlMatch = envContent.match(/DATABASE_URL="(.+)"/);
  if (!dbUrlMatch) {
    console.error("DATABASE_URL not found in .env");
    process.exit(1);
  }
  const connectionString = dbUrlMatch[1];

  const client = new Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM smtp_config LIMIT 1');
    console.log('---SMTP_DATA_START---');
    console.log(JSON.stringify(res.rows, null, 2));
    console.log('---SMTP_DATA_END---');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

main();

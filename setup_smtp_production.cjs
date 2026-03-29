const { Pool } = require('pg');
const pool = new Pool({ 
  connectionString: 'postgresql://neondb_owner:npg_oj9kIX7eKtzT@ep-small-band-am21gtlr-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require' 
});

async function run() {
  try {
    console.log('Attempting to update SMTP configuration...');
    
    // 1️⃣ Delete existing config
    await pool.query('DELETE FROM smtp_config');
    
    // 2️⃣ Insert your Gmail config
    // Note: "user" is a quoted identifier in SQL
    const query = 'INSERT INTO smtp_config (host, port, secure, "user", password, from_name, from_email) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [
      'smtp.gmail.com',
      465,
      true, // SSL for port 465
      'taysireone@gmail.com',
      'ojmrzhoobywykmoz', // Your app password
      'Taysir One',
      'taysireone@gmail.com'
    ];
    
    await pool.query(query, values);
    
    console.log('✅ SMTP configuration for taysireone@gmail.com has been successfully applied!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to update SMTP config:', error);
    process.exit(1);
  }
}

run();

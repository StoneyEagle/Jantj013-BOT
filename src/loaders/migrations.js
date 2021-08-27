
const fs = require('fs');
const { execSync } = require('child_process');
const { prismaMedia } = require('../config/database');

module.exports = async () => {
  if (!fs.existsSync(__dirname + "/../../databases")) {
    fs.mkdirSync(__dirname + "/../../databases", { recursive: true });
  }

  execSync('npx prisma migrate dev --name init && npx prisma generate');
  await prismaMedia.$queryRaw('PRAGMA journal_mode=WAL;');
  
  console.log('Database migrated.');

};

const fs           = require('fs');
const { execSync } = require('child_process');
const { prismaMedia } = require('../config/database');

module.exports = async () => {
  if (!fs.existsSync(__dirname + "/../../databases")) {
    fs.mkdirSync(__dirname + "/../../databases", { recursive: true });
  }

  // if (!fs.existsSync(__dirname + "/../../databases/media.db")) {
  //   let message = 'Migrating media database';
  //   Logger.log({
  //     level: 'info',
  //     name: 'app',
  //     color: 'magentaBright',
  //     message: message,
  //     file: __filename,
  //   });

    execSync('npx prisma migrate dev --name init && npx prisma generate');
    await prismaMedia.$queryRaw('PRAGMA journal_mode=WAL;');
  // }
  
  
}
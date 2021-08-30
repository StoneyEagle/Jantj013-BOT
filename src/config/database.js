const { PrismaClient } = require('@prisma/client');

const prismaMedia = new PrismaClient({ 
  datasources: { 
    db: { 
      url: `file:${__dirname}/../../databases/media.db?socket_timeout=10&connection_limit=1&timeout=5000`,
    }
  }
});

prismaMedia.$on('error', e => {
  console.log(e)
});

module.exports = {
  prismaMedia,
};
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

async function insertOrUpdate(db, tableName, data, conflict) {
  const firstData = data[0] ? data[0] : data;

  db.transaction(function (trx) {
      return Promise.all([
          db.raw(
              db(tableName).insert(data).toQuery() + ` ON CONFLICT (${conflict}) DO UPDATE SET ` +
              Object.keys(firstData).map((field) => `${field}=EXCLUDED.${field}`).join(', ')).transacting(trx)
      ]);
  })
};



const upsert = (params) => {
  const {db, table, object, constraint} = params;
  const firstData = object[0] ? object[0] : object;
  const insert = db(table).insert(object).toQuery();
  if(insert){
      return db.raw(`${insert} ON CONFLICT ${constraint} DO UPDATE SET ` + Object.keys(firstData).map((field) => `${field}=EXCLUDED.${field}`).join(', ')).then();
  }
  return;
};

module.exports = {
  insertOrUpdate,
  upsert,
  prismaMedia,
};
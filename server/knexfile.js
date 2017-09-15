const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL || `postgres://${process.env.USER}@127.0.0.1:5432/livejazz`,
  searchPath: 'public',
};

module.exports = config;

const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL || `postgres://${process.env.USER}@127.0.0.1:5432/livejazz`,
  searchPath: 'public',
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
  pool: {
    max: 2,
    min: 1,
  },
};

module.exports = config;

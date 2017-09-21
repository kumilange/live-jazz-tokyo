const config = {
  development: {
    client: 'pg',
    connection: `postgres://${process.env.USER}@127.0.0.1:5432/livejazz`,
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
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
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
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || `postgres://${process.env.USER}@127.0.0.1:5432/livejazztest`,
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
  },
};

module.exports = config[process.env.NODE_ENV] || config.development;

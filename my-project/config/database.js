// path: ./config/database.js

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST", "192.168.1.119"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "emqx"),
      user: env("DATABASE_USERNAME", "dct"),
      password: env("DATABASE_PASSWORD", "abc123456"),
      ssl: {
        rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
      },
    },
    debug: false,
  },
});

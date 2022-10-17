import type { Knex } from "knex";
import dotnev from "dotenv";
dotnev.config();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            database: "cap_project",
            user: "postgres",
            password: "postgres"
            // database: process.env.DB_NAME,
            // user: process.env.DB_USERNAME,
            // password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    test: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            host: 'postgres',
            database: "cap_project",
            user: "postgres",
            password: "postgres"
            // database: process.env.POSTGRES_DB,
            // host: process.env.POSTGRES_HOST,
            // user: process.env.POSTGRES_USER,
            // password: process.env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

module.exports = config;
const knexConfigs = config;
export default knexConfigs;

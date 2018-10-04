
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the fast_food_db');
});

/**
 * Open Pool connection
 * @param {*} queryText - The PostgreSQl command to create table
 * @param {*} table - the created/deleted table 
 */
function pullQuery(queryText, table) {
    pool.query(queryText, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            pool.end();
        }
    });
}

/**
 * Create Tables
 */
async function createTables() {

    const enum_account = `CREATE TYPE user_role AS ENUM ('User', 'Admin');`;
    const enum_role = `CREATE TYPE status AS ENUM ('New' , 'Processing' , 'Cancelled', 'Complete');`;
    const userAccounts = `CREATE TABLE IF NOT EXISTS user_accounts(
        user_id SERIAL PRIMARY KEY,
        user_name varchar(255) NOT NULL,
        user_role user_role DEFAULT 'User',
        user_email varchar(255) NOT NULL UNIQUE,
        user_password varchar(255) NOT NULL,
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date TIMESTAMP DEFAULT NULL
      );`;
    const foodItems = `CREATE TABLE IF NOT EXISTS food_items(
        item_id SERIAL PRIMARY KEY,
        item_name varchar(255) NOT NULL UNIQUE,
        item_image varchar(255) NOT NULL,
        item_price integer NOT NULL,
        item_tag varchar(255) NOT NULL,
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date TIMESTAMP DEFAULT NULL
      );`;
    const orders = `CREATE TABLE IF NOT EXISTS orders(
        Order_id SERIAL PRIMARY KEY,
        item_id integer NOT NULL UNIQUE,
        FOREIGN KEY (item_id) REFERENCES food_items (item_id),
        quantity integer NOT NULL,
        total_price integer NOT NULL,
        order_status status DEFAULT 'New',
        customer_address varchar(255) NOT NULL,
        customer_id integer NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES user_accounts (user_id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NULL
      )`;
    const input = enum_account + enum_role + userAccounts + foodItems + orders;
    await pullQuery(input);
}
/**
 * Drop Tables
 */
const dropTables = () => {
    const drop = 'delete';
    const queryText = 'DROP TABLE IF EXISTS user_accounts, food_items, orders; DROP TYPE IF EXISTS user_role, status';
    pullQuery(queryText);
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables,
    dropTables
};

async function instantiateTables() {
    try {
        // drop existing tables
        await dropTables();

        // create new tables
        await createTables();
        console.log('All Tables created successfully!');
    } catch (err) {
        console.log(err);
    }
}

instantiateTables();
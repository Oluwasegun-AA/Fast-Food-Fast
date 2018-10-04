import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the fast_food_db');
});

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export default {
/**
 * Database Query
 * @param {*} text - query text 
 * @param {*} params - values required by text
 */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}
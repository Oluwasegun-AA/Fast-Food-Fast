import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default {
/**
 * Database Query
 * @param {*} text - query text 
 * @param {*} params - values required by text
 */

 // Using async await
async query (text, params){
  return await pool.query(text, params);
}

// old method using promises
  // query(text, params){
  //   return new Promise((resolve, reject) => {
  //     pool.query(text, params)
  //     .then((res) => {
  //       resolve(res);
  //     })
  //   })
  // }
}
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

export const db = drizzle(sql, { schema });

const fetchData = async () => {
    try {
        const result = await db.select().from();
        console.log(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

// const result = await db.select().from(...);

// export const db = drizzle(sql,{schema});
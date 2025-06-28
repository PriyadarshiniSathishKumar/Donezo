import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, tasks } from '@shared/schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema: { users, tasks } });
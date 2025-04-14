import { Pool, neonConfig } from "@neondatabase/serverless";
import { neon } from "@neondatabase/serverless";
import ws from "ws";
import { drizzle } from "drizzle-orm/neon-serverless";
import { drizzle as neonDrizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// In Node environments where WebSocket isn’t defined globally,
// you must provide a WebSocket constructor.
neonConfig.webSocketConstructor = ws;

// Create a connection pool with your Neon connection string.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM with the pool and your schema.
export const neon_db = drizzle({ client: pool, schema });

// for production
const sql = neon(process.env.DATABASE_URL!);
export const db = neonDrizzle({ client: sql, schema });

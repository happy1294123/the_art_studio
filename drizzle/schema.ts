import { mysqlTable, mysqlSchema, AnyMySqlColumn, serial, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const users = mysqlTable("users", {
	id: int("id"),
	name: varchar("name", { length: 255 })
});

type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;
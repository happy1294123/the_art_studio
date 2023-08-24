import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const users = mysqlTable("users", {
	id: int("id"),
	name: varchar("name", { length: 255 })
});
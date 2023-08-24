// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";
// import { users } from '@/drizzle/schema'


// export default async function getAllDbData(): Promise<Users[]> {
//   const conn = connect({
//     host: process.env["DATABASE_HOST"],
//     username: process.env["DATABASE_USERNAME"],
//     password: process.env["DATABASE_PASSWORD"],
//   })
//   const db = drizzle(conn)

//   const results: Users[] = await db.select({
//     id: users.id,
//     name: users.name
//   })
//     .from(users)

//   return results
// }

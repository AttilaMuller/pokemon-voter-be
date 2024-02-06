
import { DataSource } from "typeorm"
import { Pokemon } from "../entities/Pokemon"

export const ormDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    url: process.env.DATABASE_URL,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Pokemon],
    logging: true,
    synchronize: true,
})
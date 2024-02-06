import { DataSource } from "typeorm"
import { Pokemon } from "../entities/Pokemon"

export const ormDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    port: 5432,
    entities: [Pokemon],
    logging: true,
    synchronize: true
})

export const ormTestDataSource = new DataSource({
    type: 'postgres',
    url: 'postgres://test:password@localhost:5433/testdb',
    port: 5433,
    entities: [Pokemon],
    logging: false,
    synchronize: true
});
import { DataSource } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Ticket],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
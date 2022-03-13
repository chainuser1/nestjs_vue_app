import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

const  config:MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'react_php_db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrations: ['dist/src/database/migrations/*.js'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
}
export default config
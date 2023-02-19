import { config } from 'dotenv';
import {
  NODE_ENVIRONMENTS,
  DATABASE_ENGINE,
  DATABASE_PORT,
  SERVER_NAME,
  DATABASE_USER,
  PORT_APP,
  DATABASE_NAME,
  DATABASE_PASS,
} from './configGuard';
config();

// console.log(process.env.NICKNAME);

export default {
  //Entorno del proyecto
  node_env: NODE_ENVIRONMENTS(process.env.NODE_ENV),
  //configuraciones del servidor express
  port: PORT_APP(process.env.port || 3000),
  // configuraciones del servidor de Base de datos
  db_user: DATABASE_USER(process.env.DB_USER || ''),
  db_pass: DATABASE_PASS(process.env.DB_PASSWORD || ''),
  db_server: SERVER_NAME(process.env.DB_SERVER || ''),
  db_port: DATABASE_PORT(process.env.DB_PORT || 1433),
  db_name: DATABASE_NAME(process.env.DB_NAME || ''),
  db_engine: DATABASE_ENGINE(process.env.DB_ENGINE || ''),
  jwt_secret: process.env.JWT_PRIVATE_KEY,
};

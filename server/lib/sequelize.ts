import "dotenv/config"

import {Sequelize} from "sequelize";


export const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.SEQ_USERNAME,
    password: process.env.SEQ_PASSWORD,
    database: process.env.SEQ_DATABASE,
    port: 5432,
    host: process.env.SEQ_HOST,
    ssl: true,
    
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
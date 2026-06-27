import dotenv from "dotenv";
dotenv.config();

import app from "./index";
import { connectDatabase, env } from "./config/index";

async function boostrap() {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(`
            🚀 Server running 
            🌍 Environment:${env.NODE_ENV}
            📡 Port: ${env.PORT}
            `);
  });
}

boostrap();

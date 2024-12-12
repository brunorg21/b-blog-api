// Server Setup

import { env } from "./env";
import { initializeServer } from "./infra";

initializeServer().then(() =>
  console.log(
    `HTTP Server started successfully on port ${env.SERVER_PORT} 😁😁`
  )
);

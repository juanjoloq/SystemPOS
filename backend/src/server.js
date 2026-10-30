import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";

import app from "./app.js";
import { conectarDB } from "./config/database.js";
import { ejecutarSeeders } from "./seeders/index.js";

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await conectarDB();

    await ejecutarSeeders();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();
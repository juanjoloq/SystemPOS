import { crearAdmin } from "./admin.seed.js";

export const ejecutarSeeders = async () => {
  console.log("🌱 Ejecutando seeders...");

  await crearAdmin();

  console.log("✅ Seeders ejecutados correctamente.");
};
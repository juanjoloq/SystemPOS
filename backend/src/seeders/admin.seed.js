import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { normalizarTexto } from "../utils/normalizarTexto.js";

export const crearAdmin = async () => {
  try {
    const adminExiste = await Usuario.findOne({ rol: "ADMIN" });

    if (adminExiste) {
      console.log("ℹ️ Ya existe un administrador.");
      return;
    }

    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Usuario.create({
      nombre: process.env.ADMIN_NAME,
      usuario: normalizarTexto(process.env.ADMIN_USERNAME),
      password: passwordHash,
      rol: "ADMIN",
      activo: true,
    });

    console.log("✅ Administrador creado correctamente.");
  } catch (error) {
    console.error("❌ Error al crear el administrador:", error);
    throw error;
  }
};
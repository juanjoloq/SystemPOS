import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    usuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    rol: {
      type: String,
      enum: ["ADMIN", "EMPLEADO"],
      default: "EMPLEADO",
    },

    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.method("toJSON", function () {
  const { __v, password, createdAt, updatedAt, ...usuario } = this.toObject();

  usuario.id = usuario._id;
  delete usuario._id;

  return usuario;
});

export default mongoose.model("Usuario", usuarioSchema);
import { Schema, model } from "mongoose";
import { MODULOS, ACCIONES } from "../constants/auditoria.js";

const auditoriaSchema = new Schema(
  {
    usuario: {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
      },

      nombre: {
        type: String,
        required: true,
        trim: true,
      },
    },

    modulo: {
      type: String,
      required: true,
      enum: Object.values(MODULOS),
    },

    accion: {
      type: String,
      required: true,
      enum: Object.values(ACCIONES),
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    motivo: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

auditoriaSchema.index({ createdAt: -1 });
auditoriaSchema.index({ modulo: 1 });
auditoriaSchema.index({ accion: 1 });
auditoriaSchema.index({ "usuario.id": 1 });

auditoriaSchema.methods.toJSON = function () {
  const { __v, _id, updatedAt, ...auditoria } = this.toObject();

  auditoria.id = _id;

  return auditoria;
};

export default model("Auditoria", auditoriaSchema);
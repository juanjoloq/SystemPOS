import { Schema, model } from "mongoose";
import { normalizarTexto } from "../utils/normalizarTexto.js";

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
    },

    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoría es obligatoria."],
    },

    precio: {
      type: Number,
      required: [true, "El precio es obligatorio."],
      min: [0.01, "El precio debe ser mayor a 0."],
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

productoSchema.index(
  {
    nombre: 1,
    categoria: 1,
  },
  {
    unique: true,
  }
);

productoSchema.index({ nombre: 1 });

productoSchema.pre("save", function () {
  this.nombre = normalizarTexto(this.nombre);
});

productoSchema.methods.toJSON = function () {
  const { __v, _id, ...producto } = this.toObject();

  producto.id = _id;

  return producto;
};

export default model("Producto", productoSchema);
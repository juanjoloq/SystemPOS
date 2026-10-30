import { Schema, model } from "mongoose";

const productoVentaSchema = new Schema(
  {
    productoId: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },

    nombre: {
      type: String,
      required: true,
    },

    categoria: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
      },

      nombre: {
        type: String,
        required: true,
      },
    },

    precioUnitario: {
      type: Number,
      required: true,
      min: 0,
    },

    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const ventaSchema = new Schema(
  {
    productos: {
      type: [productoVentaSchema],
      validate: {
        validator: (productos) => productos.length > 0,
        message: "La venta debe tener al menos un producto.",
      },
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    estado: {
      type: String,
      enum: ["ACTIVA", "ANULADA"],
      default: "ACTIVA",
    },

    motivoModificacion: {
      type: String,
      trim: true,
      default: null,
    },

    motivoAnulacion: {
      type: String,
      trim: true,
      default: null,
    },

    fechaAnulacion: {
      type: Date,
      default: null,
    },

    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    actualizadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },

    anuladoPor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ventaSchema.methods.toJSON = function () {
  const { __v, _id, ...venta } = this.toObject();

  venta.id = _id;

  return venta;
};

export default model("Venta", ventaSchema);
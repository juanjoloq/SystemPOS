import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

categoriaSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;

    ret.id = ret._id;
    delete ret._id;

    return ret;
  },
});

export default mongoose.model("Categoria", categoriaSchema);
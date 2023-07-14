import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      require: true,
      maxLength: 50,
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    subCatId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("product", productsSchema);

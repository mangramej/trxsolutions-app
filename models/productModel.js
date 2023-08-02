import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: Boolean,
      default: true, // set the default status to true (i.e., product is on)
    },
    featured: {
      type: Boolean,
      default: false, // set the default status to true (i.e., product is on)
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);

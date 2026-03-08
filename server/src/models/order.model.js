import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["readymade", "custom"],
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "delivered", "cancelled"],
      default: "pending",
    },

    // Customer Info
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String, required: true },
    },

    // Ready-made order fields
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    size: String,
    quantity: {
      type: Number,
      default: 1,
    },

    // Custom order fields
    customOrder: {
      designImage: String,
      bodyMeasurements: String,
      fabricProvided: {
        type: Boolean,
        default: false,
      },
      notes: String,
    },

    // Payment Info
    payment: {
      method: {
        type: String,
        enum: ["bkash", "nagad", "rocket", "cod"],
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
      },
      transactionId: String,
      advanceAmount: {
        type: Number,
        default: 0,
      },
    },

    deliveryCharge: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

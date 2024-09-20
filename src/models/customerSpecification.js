import mongoose from "mongoose";

const customerSpecificationSchema = new mongoose.Schema(
  {
    customerNumber: {
      type: String,
      trim: true,
    },
    isDefault: {
      type: Boolean,
    },
    customerSpecification: {
      particularities: {
        type: String,
        trim: true,
      },
      packaging: {
        type: String,
        trim: true,
      },
      deliveryAddressDifferentFromStandardAddress: {
        type: String,
        trim: true,
      },
      deliveryAddress: {
        type: String,
        trim: true,
      },
      deliveryTimes: {
        type: Array,
      },
      deliveryTimesNote: {
        type: String,
        trim: true,
      },
      instructionsForDelivery: {
        type: String,
        trim: true,
      },
      specialFeaturesPackaging: {
        type: String,
        trim: true,
      },
      provisionOfTerminalCover: {
        type: String,
        trim: true,
      },
      packagingTerminalCover: {
        type: String,
        trim: true,
      },
      terminalBlockScrews: {
        type: String,
        trim: true,
      },
      modeOfTransport: {
        type: String,
        trim: true,
      },
      notification: {
        type: String,
        trim: true,
      },
      deliveryNoteValue: {
        type: String,
        trim: true,
      },
      type: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      provisionOfModuleCover: {
        type: String,
        trim: true,
      },
      packagingModulecover: {
        type: String,
        trim: true,
      },
      electronicInvoiceValue: {
        type: String,
        trim: true,
      },
      electronicInvoiceEmail: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);
const customerSpecification =
  mongoose.models.customerSpecification ||
  mongoose.model("customerSpecification", customerSpecificationSchema);
export default customerSpecification;

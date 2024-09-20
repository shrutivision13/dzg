import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    formNameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "formName",
    },
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    requestForChanges: {
      type: Boolean,
      default: false,
    },
    isReviewerApproved: {
      type: Boolean,
      default: false,
    },
    isWriterApproved: {
      type: Boolean,
      default: false,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      trim: true,
      default: null,
    },
    otpCode: {
      type: Number,
      default: null,
    },
    otpExpireIn: {
      type: Number,
      default: null,
    },
    path: {
      type: String,
      default: "",
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    // apOrderNumber: {
    //   type: Number,
    // },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isRelease: {
      type: Boolean,
      default: false
    },
    customer: {
      customerNumber: {
        type: String,
        trim: true,
      },
      customerName: {
        type: String,
        trim: true,
      },
      customerOrderNumber: {
        type: String,
        trim: true,
      },
      contactPerson: {
        type: String,
        trim: true,
      },
      orderConfirmationAndPosition: {
        type: String,
        trim: true,
      },
      date: {
        type: String,
        trim: true,
      },
      salesArea: {
        type: String,
        trim: true,
      },
      createdBy: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
    },
    configuration: {
      type: {
        type: String,
        trim: true,
      },
      number: {
        type: Number,
      },
      materialNoCustomer: {
        type: String,
        trim: true,
      },
      accuracyClass: {
        type: String,
        trim: true,
      },
      gridOption: {
        type: String,
        trim: true,
      },
      tariffCounters: {
        type: String,
        trim: true,
      },
      meterPinAssembly: {
        type: String,
        trim: true,
      },
      automaticTariffActivation: {
        type: String,
        trim: true,
      },
      tariffControl230VAtTerminal13: {
        type: String,
        trim: true,
      },
      twoWireOperation: {
        type: String,
        trim: true,
      },
      pinProtection: {
        type: String,
        trim: true,
      },
      pinType: {
        type: String,
        trim: true,
      },
      pinValue: {
        type: Number,
      },
      currentInformationlRef: {
        type: Number,
      },
      currentInformationlMax: {
        type: Number,
      },
      measuringMechanism: {
        type: String,
        trim: true,
      },
      deliveryStatusTariffClassification: {
        type: String,
        trim: true,
      },
      deviceVersion: {
        type: String,
        trim: true,
      },
      converterRatio: {
        type: String,
        trim: true,
      },
      converterText: {
        type: String,
        trim: true,
      },
      flashlightFunction: {
        type: String,
        trim: true,
      },
      deviceType: {
        type: String,
        trim: true,
      },
      dataTransferIntervalTime: {
        type: String,
        trim: true,
      },
      dataTransferIntervalText: {
        type: String,
        trim: true,
      },
      synchronousTransmission: {
        type: String,
        trim: true,
      },
      frameType: {
        type: String,
        trim: true,
      },
      preConfiguration: {
        type: String,
        trim: true,
      },
      preConfigurationValue: {
        type: String,
        trim: true,
      },
      appEUI: {
        type: String,
        trim: true,
      },
      appEUIText: {
        type: String,
        trim: true,
      },
      appKey: {
        type: String,
        trim: true,
      },
      appKeyText: {
        type: String,
        trim: true,
      },
      displayExtension: {
        type: String,
        trim: true,
      },
      encryptionProcedure: {
        type: String,
        trim: true,
      },
      communicationAddress: {
        type: String,
        trim: true,
      },
      pluginInserted: {
        type: String,
        trim: true,
      }
    },
    deviceLabeling: {
      additionalLabeling: {
        type: String,
        trim: true,
      },
      existingOwnershipNotices: {
        type: String,
        trim: true,
      },
      propertyNumber: {
        type: String,
        trim: true,
      },
      ownershipNotice: {
        type: String,
        trim: true,
      },
      from: {
        type: String,
        trim: true,
      },
      to: {
        type: String,
        trim: true,
      },
      customDesignation: {
        type: String,
        trim: true,
      },
    },
    remarks: {
      type: String,
      trim: true,
    },
    remarkImage: {
      type: String,
      trim: true,
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
    releases: {
      releaseByCustomer: [
        {
          date: {
            type: String,
            trim: true,
          },
          name: {
            type: String,
            trim: true,
          },
        },
      ],
      approvalBySales: [
        {
          date: {
            type: String,
            trim: true,
          },
          name: {
            type: String,
            trim: true,
          },
          approvalFromCustomerViaEmailOrPhone: {
            type: String,
            trim: true,
          },
        },
      ],
    },
    terminalCover: {
      cover: {
        type: String,
        trim: true,
      },
      moduleCover: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);
const form = mongoose.models.form || mongoose.model("form", formSchema);
export default form;

import Joi from "joi";

export const createFormValidate200 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      electronicInvoiceValue: Joi.string().required(),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });

  return Schema.validate(data);
};

export const createFormValidate201 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      accuracyClass: Joi.string().required(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate202 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      accuracyClass: Joi.string().required(),
      currentInformationlRef: Joi.number().required(),
      currentInformationlMax: Joi.number().required(),
      twoWireOperation: Joi.string().required(),
      measuringMechanism: Joi.string().required(),
      tariffCounters: Joi.string().required(),
      automaticTariffActivation: Joi.string().optional(),
      tariffControl230VAtTerminal13: Joi.string().optional(),
      deliveryStatusTariffClassification: Joi.string().optional(),
      gridOption: Joi.string().required(),
      meterPinAssembly: Joi.string().required(),
      pinProtection: Joi.string().required(),
      pinType: Joi.string().required(),
      pinValue: Joi.number().when("pinType", {
        is: "fester Wert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate203 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      accuracyClass: Joi.string().required(),
      deviceVersion: Joi.string().required(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate204 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      converterRatio: Joi.string().required(),
      converterText: Joi.string().optional(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate205 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      currentInformationlRef: Joi.number().required(),
      currentInformationlMax: Joi.number().required(),
      accuracyClass: Joi.string().required(),
      twoWireOperation: Joi.string().required(),
      measuringMechanism: Joi.string().required(),
      tariffCounters: Joi.string().required(),
      tariffControl230VAtTerminal13: Joi.string().optional(),
      deliveryStatusTariffClassification: Joi.string().optional(),
      meterPinAssembly: Joi.string().required(),
      pinProtection: Joi.string().required(),
      pinType: Joi.string().required(),
      pinValue: Joi.number().when("pinType", {
        is: "fester Wert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate206 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      accuracyClass: Joi.string().required(),
      currentInformationlRef: Joi.number().required(),
      currentInformationlMax: Joi.number().required(),
      measuringMechanism: Joi.string().required(),
      tariffCounters: Joi.string().required(),
      tariffControl230VAtTerminal13: Joi.string().optional(),
      deliveryStatusTariffClassification: Joi.string().optional(),
      meterPinAssembly: Joi.string().required(),
      pinProtection: Joi.string().required(),
      pinType: Joi.string().required(),
      pinValue: Joi.number().when("pinType", {
        is: "fester Wert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate207 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      accuracyClass: Joi.string().required(),
      currentInformationlRef: Joi.number().required(),
      currentInformationlMax: Joi.number().required(),
      meterPinAssembly: Joi.string().required(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate208 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      currentInformationlRef: Joi.number().required(),
      accuracyClass: Joi.string().required(),
      twoWireOperation: Joi.string().required(),
      measuringMechanism: Joi.string().required(),
      gridOption: Joi.string().required(),
      pinProtection: Joi.string().required(),
      pinType: Joi.string().required(),
      pinValue: Joi.number().when("pinType", {
        is: "fester Wert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate209 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      currentInformationlRef: Joi.number().required(),
      accuracyClass: Joi.string().required(),
      twoWireOperation: Joi.string().required(),
      measuringMechanism: Joi.string().required(),
      tariffCounters: Joi.string().required(),
      tariffControl230VAtTerminal13: Joi.string().optional(),
      deliveryStatusTariffClassification: Joi.string().optional(),
      meterPinAssembly: Joi.string().required(),
      pinProtection: Joi.string().required(),
      pinType: Joi.string().required(),
      pinValue: Joi.number().when("pinType", {
        is: "fester Wert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      flashlightFunction: Joi.string().required(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate210 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      deviceType: Joi.string().required(),
      dataTransferIntervalTime: Joi.string().required(),
      dataTransferIntervalText: Joi.string().optional(),
      synchronousTransmission: Joi.string().when("frameType", {
        is: "Erweitert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      frameType: Joi.string().required(),
      preConfiguration: Joi.string().required(),
      preConfigurationValue: Joi.string().when("preConfiguration", {
        is: "andere Zählertypen",
        then: Joi.required(),
        otherwise: Joi.optional().allow(""),
      }),
      appEUI: Joi.string().required(),
      appEUIText: Joi.string().optional(),
      appKey: Joi.string().required(),
      appKeyText: Joi.string().optional(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate211 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      displayExtension: Joi.string().required(),
      accuracyClass: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate212 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      displayExtension: Joi.string().required(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate214 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      deviceVersion: Joi.string().required(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate215 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      dataTransferIntervalTime: Joi.string().required(),
      dataTransferIntervalText: Joi.string().optional(),
      encryptionProcedure: Joi.string().required(),
      preConfiguration: Joi.string().required(),
      preConfigurationValue: Joi.string().when("preConfiguration", {
        is: "andere Zählertypen",
        then: Joi.required(),
        otherwise: Joi.optional().allow(""),
      }),
      deliveryStatusTariffClassification: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate216 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      dataTransferIntervalTime: Joi.string().required(),
      dataTransferIntervalText: Joi.string().optional(),
      encryptionProcedure: Joi.string().required(),
      deliveryStatusTariffClassification: Joi.string().required(),
      pluginInserted: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate217 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      deviceType: Joi.string().required(),
      dataTransferIntervalTime: Joi.string().required(),
      dataTransferIntervalText: Joi.string().optional(),
      synchronousTransmission: Joi.string().when("frameType", {
        is: "Erweitert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      frameType: Joi.string().required(),
      appEUI: Joi.string().required(),
      appEUIText: Joi.string().optional(),
      appKey: Joi.string().required(),
      appKeyText: Joi.string().optional(),
      pluginInserted: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate218 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate219 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      currentInformationlRef: Joi.number().required(),
      accuracyClass: Joi.string().required(),
      measuringMechanism: Joi.string().required(),
      tariffCounters: Joi.string().required(),
      tariffControl230VAtTerminal13: Joi.string().optional(),
      deliveryStatusTariffClassification: Joi.string().optional(),
      meterPinAssembly: Joi.string().required(),
      pinProtection: Joi.string().required(),
      pinType: Joi.string().required(),
      pinValue: Joi.number().when("pinType", {
        is: "fester Wert",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      flashlightFunction: Joi.string().required(),
    }).required(),
    deviceLabeling: Joi.object({
      additionalLabeling: Joi.string().allow("").optional(),
      propertyNumber: Joi.string().required(),
      ownershipNotice: Joi.string().required(),
      existingOwnershipNotices: Joi.string().optional(),
      from: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      to: Joi.string().max(15).when("propertyNumber", {
        is: "meter number",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      customDesignation: Joi.string().max(40).when("ownershipNotice", {
        is: "Kundespezifische Bezeichnung",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    }).optional(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate220 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      measuringMechanism: Joi.string().required(),
      communicationAddress: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate222 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      pluginInserted: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate223 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      pluginInserted: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const createFormValidate230 = (data) => {
  const Schema = Joi.object({
    formNameId: Joi.string().min(24).max(24).required(),
    _id: Joi.string().min(24).max(24).optional(),
    requestForChanges: Joi.boolean().required(),
    isReviewerApproved: Joi.boolean().required(),
    isWriterApproved: Joi.boolean().required(),
    isApproved: Joi.boolean().optional(),
    isRelease: Joi.boolean().optional(),
    isCancelled: Joi.boolean().optional(),
    isArchived: Joi.boolean().optional(),
    isDraft: Joi.boolean().optional(),
    isDefault: Joi.boolean().required(),
    email: Joi.string().allow("").email().optional(),
    date: Joi.string().optional(),
    ipAddress: Joi.string().optional(),
    customer: Joi.object({
      customerName: Joi.string().required(),
      customerNumber: Joi.string().required(),
      customerOrderNumber: Joi.string().allow("").optional(),
      contactPerson: Joi.string().allow("").optional(),
      orderConfirmationAndPosition: Joi.string().allow("").optional(),
      date: Joi.string()
        .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
        .required()
        .error(new Error("Date format must be DD.MM.YYYY")),
      salesArea: Joi.string().required(),
      createdBy: Joi.string().required(),
      email: Joi.string().allow("").email().required(),
    }).required(),
    configuration: Joi.object({
      type: Joi.string().required(),
      number: Joi.number().required(),
      materialNoCustomer: Joi.string().allow("").optional(),
      displayExtension: Joi.string().required(),
      accuracyClass: Joi.string().required(),
    }).required(),
    remarks: Joi.string().max(1000).allow("").optional(),
    remarkImage: Joi.string().optional(),
    customerSpecification: Joi.object({
      particularities: Joi.string().allow("").optional(),
      packaging: Joi.string().allow("").optional(),
      deliveryAddressDifferentFromStandardAddress: Joi.string().required(),
      deliveryAddress: Joi.string().when(
        "deliveryAddressDifferentFromStandardAddress",
        {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }
      ),
      deliveryTimes: Joi.array().allow("").optional(),
      deliveryTimesNote: Joi.string().allow("").optional(),
      provisionOfTerminalCover: Joi.string().required(),
      terminalBlockScrews: Joi.string().required(),
      modeOfTransport: Joi.string().required(),
      deliveryNoteValue: Joi.string().required(),
      type: Joi.string().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      email: Joi.string().email().when("deliveryNoteValue", {
        is: "Yes",
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      provisionOfModuleCover: Joi.string().required(),
      packagingModulecover: Joi.string().allow("").optional(),
      electronicInvoiceValue: Joi.string().required(),
      electronicInvoiceEmail: Joi.string()
        .email()
        .when("electronicInvoiceValue", {
          is: "Yes",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      instructionsForDelivery: Joi.string().allow("").optional(),
      specialFeaturesPackaging: Joi.string().allow("").optional(),
      packagingTerminalCover: Joi.string().allow("").optional(),
      notification: Joi.string().allow("").optional(),
    }).required(),
    terminalCover: Joi.object({
      cover: Joi.string().required(),
      moduleCover: Joi.string().optional(),
    }).required(),
  });
  return Schema.validate(data);
};

export const reSendMailValidate = (data) => {
  const Schema = Joi.object({
    formId: Joi.string().min(24).max(24).required(),
    email: Joi.string().allow("").email().optional(),
  });
  return Schema.validate(data);
};

export const writerFromApproveValidate = (data) => {
  const Schema = Joi.object({
    formId: Joi.string().min(24).max(24).required(),
    formNameId: Joi.string().min(24).max(24).required(),
    approvedBy: Joi.string().required(),
    isWriterApproved: Joi.boolean().required(),
    date: Joi.string().required(),
    // apOrderNumber: Joi.string().max(10).required(),
    isApproved: Joi.boolean().required(),
    requestForChanges: Joi.boolean().required(),
  });
  return Schema.validate(data);
};

export const archivedFormValidate = (data) => {
  const Schema = Joi.object({
    formId: Joi.string().min(24).max(24).required(),
    isArchived: Joi.boolean().required(),
  });
  return Schema.validate(data);
};

export const releaseFromValidate = (data) => {
  const Schema = Joi.object({
    formId: Joi.string().min(24).max(24).required(),
    isRelease: Joi.boolean().required(),
  });
  return Schema.validate(data);
};

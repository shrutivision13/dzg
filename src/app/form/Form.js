"use client";
import {
	Card,
	InputLabel,
	Select,
	MenuItem,
	FormControlLabel,
	Radio,
	Controller,
	DialogActions,
	Button,
	useForm,
	TextField,
	RadioGroup,
	useEffect,
	Toast,
	handleLoader,
	Box,
	CloseIcon,
} from "../../helper/imports/Imports";
import React, { useRef } from "react";
import { useState } from "react";
import FormList from "./FormList";
import { useDispatch } from "react-redux";
import { formData } from "./FormData";
import AssignViewer from "./AssignViewer";
import {
	ApiUpdateList,
	ApiViewList,
	ApiProfileDetails,
	ApiSaveList,
	ApiSearchCustomerNumber,
	ApiSpecificatioData,
	ApiSearchContactPerson,
} from "@/api-wrapper/ApiForm";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import { Autocomplete, Checkbox, Dialog, DialogTitle, FormControl, IconButton, Modal, Typography } from '@mui/material';

import CreatableSelect from 'react-select/creatable';

function Form({ param }) {
	let router = useRouter();
	let dispatch = useDispatch();

	const {
		watch,
		reset,
		control,
		handleSubmit,
		ref,
		formState: { errors },
		getValues,
		setValue,
		clearErrors,
		unregister,
		trigger
	} = useForm();
	const [isDisabled, setisDisabled] = useState(param);
	const [list, setList] = useState([]);
	const [selectedForm, setSelectedForm] = useState("");
	const [selectedFormId, setSelectedFormId] = useState("");
	const [viewerShow, setViewerShow] = useState(false);
	const [currentForm, setcurrentForm] = useState([]);
	const [submitData, setsubmitData] = useState();
	const [editStatus, setEditStatus] = useState("");
	const [otherData, setOtherData] = useState();
	const [loginUser, setLoginUser] = useState("");
	const [type, setType] = useState("");
	const [salesArea, setSalesArea] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [editArr, setEditArr] = useState([]);
	const [isApprroveModalOpen, setIsApprroveModalOpen] = useState(false);
	const [msg, setMsg] = useState('');
	const [options, setoptions] = useState([]);
	const [contactPersonoptions, setContactPersonoptions] = useState([]);
	const [isDefaultCheck, setIsDefaultCheck] = useState(false);

	let formulaFile = ['DVS74', 'DVS76', 'WS74', 'WS76', 'DVSB', 'DVZE', 'DVH4013', 'DWH4113', 'DVSBR', 'Mobile Zähler']

	const [openPreviewModal, setOpenPreviewModal] = useState({isOpen: false,
		fieldName : ""});
	const [previewImage, setPreviewImage] = useState({});

	const handleOpenModal = (field) => {
		
		setOpenPreviewModal({
			isOpen: true,
			fieldName : field
		})
	};

	const handleCloseModal = () => setOpenPreviewModal({isOpen: false});

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'auto',
		minWidth: '500px',
		minHeight: '500px',
		bgcolor: 'background.paper',
		borderRadius: '20px',
		p: 4,
	};


	useEffect(() => {
		if (param) {
			viewData();
		} else {
			setcurrentForm([]);
			reset();
		}
	}, [param]);

	const viewData = async () => {
		if (param) {
			dispatch(handleLoader(true));
			ApiViewList(param)
				.then((res) => {
					if (res.success) {
						ContactPerson(res.data.customer.customerNumber);
						setSalesArea(res.data.customer.salesArea);
						setSelectedFormId(res.data.formNameId);

						setPreviewImage({
							...previewImage,
							"remarkImage": res.data?.remarkImage || "",
							"existingOwnershipNotices": res.data?.deviceLabeling?.existingOwnershipNotices || ""
						})

						if (!res.data?.deviceLabeling?.existingOwnershipNotices) {
							let find = currentForm.find(
								(x) => x?.name == "existingOwnershipNotices"
							);
							if (find) {
								find.value = res?.data?.deviceLabeling?.existingOwnershipNotices;
							}
						} else {
							let find = currentForm.find(
								(x) => x?.name == "remarkImage"
							);
							if (find) {
								find.value = res.data?.remarkImage
							}
						}

						delete res.data.isReviewerApproved;
						delete res.data.isWriterApproved;
						delete res.data.releases;

						let newArr = []
						let arr = res.changedData
						for (const property in arr) {
							if (typeof arr[property] === 'object') {
								let obj = arr[property];
								for (const subProp in obj) {
									newArr.push(`${property}.${subProp}`)
								}
							}
							else {
								newArr.push(property)
							}

						}

						setEditArr(newArr)
						setOtherData(res.data);
						reset(res.data);

						dispatch(handleLoader(false));
					} else {
						setIsOpen(res.isOpen)
						dispatch(handleLoader(false));
						setMsg(res.message)
					}
				})
				.catch((err) => {
					dispatch(handleLoader(false));
					Toast.error("Something went wrong!!");
				});
		}

	};

	const onSubmit = (data) => {
		if (salesArea == '') {
			Toast.error("Please select Vertriebsgebiet");
		}
		else {

			delete data.createdAt
			delete data.otpCode
			delete data.__v
			delete data.releases
			delete data.formattedDate

			if (data?.customer) {
				data.customer.date =
					moment(data.customer.date).format("DD.MM.YYYY") == "Invalid date"
						? data.customer.date
						: moment(data.customer.date).format("DD.MM.YYYY");
			}
			if (data?.configuration?.dataTransferIntervalTime == "5") {
				delete data?.configuration?.dataTransferIntervalText;
			}

			if (data?.deviceLabeling?.additionalLabeling == "") {
				delete data.deviceLabeling.additionalLabeling;
			}
			if (data?.deviceLabeling?.existingOwnershipNotices) {
				let find = currentForm?.find((x) => x.name == "existingOwnershipNotices");
				if (find?.value) {
					data.deviceLabeling.existingOwnershipNotices = find?.value;
				} else {
					data.deviceLabeling.existingOwnershipNotices =
						data?.deviceLabeling?.existingOwnershipNotices;
				}
			} else {
				delete data?.deviceLabeling?.existingOwnershipNotices;
			}

			if (data?.remarkImage) {
				let find = currentForm?.find((x) => x.name == "remarkImage");
				if (find?.value) {
					data.remarkImage = find?.value;
				} else {
					data.remarkImage = data?.remarkImage;
				}
			} else {
				delete data?.remarkImage;
			}

			if (
				data?.deviceLabeling?.ownershipNotice !== "Kundespezifische Bezeichnung"
			) {
				delete data?.deviceLabeling?.customDesignation;
			}

			if (data?.configuration?.pinType == "Zufallszahl") {
				delete data.configuration.pinValue;
			}

			if (data?.configuration?.converterRatio == "1:1") {
				delete data?.configuration.converterText;
			}
			if (
				data?.configuration?.dataTransferIntervalTime == "15" ||
				data?.configuration?.dataTransferIntervalTime == "5"
			) {
				delete data.configuration.dataTransferIntervalText;
			}
			if (data?.configuration?.deliveryStatusTariffClassification == "") {
				delete data.configuration.deliveryStatusTariffClassification;
			}

			if (data?.customerSpecification?.electronicInvoiceValue == "No") {
				delete data.customerSpecification.electronicInvoiceEmail;
			}
			if (data?.customerSpecification?.deliveryNoteValue == "No") {
				delete data.customerSpecification.type;
				delete data.customerSpecification.email;
			}

			if (data?.customerSpecification?.deliveryAddressDifferentFromStandardAddress == "no") {
				delete data.customerSpecification.deliveryAddress
			}

			if (data?.deviceLabeling?.propertyNumber != "meter number") {
				delete data?.deviceLabeling?.from
				delete data?.deviceLabeling?.to
			}


			if (data?.terminalCover?.moduleCover == "") {
				delete data?.terminalCover?.moduleCover
			}

			if (data?.configuration?.appEUI != "Kundenvorgabe") {
				delete data?.configuration?.appEUIText

			}
			if (data?.configuration?.appKey != "Kundenvorgabe") {
				delete data?.configuration?.appKeyText

			}

			if (data?.configuration?.frameType == "Einfach") {
				delete data?.configuration?.synchronousTransmission
			}

			if (data?.configuration?.preConfiguration != "andere Zählertypen") {
				delete data?.configuration?.payerType
			}



			if (selectedForm == "DVS76") {

				if (data?.configuration?.tariffCounters == "1 Tarif" ||
					data?.configuration?.tariffCounters == "Typ H"
				) {
					delete data?.configuration?.automaticTariffActivation

				}
			}
			else {
				if (data?.configuration?.tariffCounters == "1 Tarif" ||
					data?.configuration?.tariffCounters == "Typ H"

				) {
					delete data?.configuration?.automaticTariffActivation
					delete data?.configuration?.tariffControl230VAtTerminal13
				}
			}

			if (selectedForm == "WS74") {
				if (data?.configuration?.tariffCounters == "Typ H") {
					delete data?.configuration?.tariffControl230VAtTerminal13
				}
			}


			if (data?.configuration?.tariffControl230VAtTerminal13 == "") {
				delete data?.configuration?.tariffControl230VAtTerminal13
			}



			data.customer.createdBy = loginUser.name || otherData.customer.createdBy;
			data.customer.date = moment(new Date()).format("DD.MM.YYYY");
			data.customer.salesArea = salesArea;
			data.configuration.type = type;
			data.isDefault = isDefaultCheck

			if (param) {
				let IsCopy = localStorage.getItem("isCopy")
				if (IsCopy === 'true') {
					dispatch(handleLoader(true));
					data.formNameId = selectedFormId;
					data.isDraft = false;
					data.requestForChanges = false;
					data.isReviewerApproved = false;
					data.isWriterApproved = false;
					data.isApproved = false;
					data.isArchived = false;
					data.isCancelled = false;
					data.isRelease = false;
					delete data._id;

					delete data.otpExpireIn;
					delete data.path;
					delete data.writerId;

					delete data.resetToken;
					delete data.updatedAt;
					delete data.packagingModulecover;
					delete data.provisionOfModuleCover;
					delete data.message;
					delete data.formattedDate
					ApiSaveList(data)
						.then((res) => {
							if (res.success) {
								Toast.success(res.message);
								router.push('/pdf');
								setViewerShow(false);
								setIsDefaultCheck(false);
								resetHandler();
								dispatch(handleLoader(false));
							} else {
								dispatch(handleLoader(false));
								Toast.error(res.message);
							}
						})
						.catch((err) => {
							dispatch(handleLoader(false));
							Toast.error("something went to wrong!!");
						});
				} else {
					dispatch(handleLoader(true));
					fetch("https://api.ipify.org?format=json")
						.then((response) => response.json())
						.then((result) => {

							data.isReviewerApproved = editStatus == "isApproved" ? true : false;
							data.isApproved = editStatus == "save" || editStatus == "requestForChanges" ? false : true;
							data.isWriterApproved = typeof window !== "undefined" && localStorage.getItem("isWriter") ? true : false,
								data.requestForChanges = editStatus == "requestForChanges" ? true : false;
							data.date = moment(new Date()).format("DD-MM-YYYY h:mm:ss a");
							data.ipAddress = result.ip;
							data.isDraft = false;
							data.isArchived = false;
							if (data?.deviceLabeling?.existingOwnershipNotices) {
								let find = currentForm?.find((x) => x.name == "existingOwnershipNotices");
								if (find?.value) {
									data.deviceLabeling.existingOwnershipNotices = find?.value;
								} else {
									data.deviceLabeling.existingOwnershipNotices =
										data?.deviceLabeling?.existingOwnershipNotices;
								}
							} else {
								delete data?.deviceLabeling?.existingOwnershipNotices;
							}

							if (data?.remarkImage) {
								let find = currentForm?.find((x) => x.name == "remarkImage");
								if (find?.value) {
									data.remarkImage = find?.value;
								} else {
									data.remarkImage =
										data?.remarkImage;
								}
							} else {
								delete data?.remarkImage;
							}
							
							delete data.packagingModulecover;
							delete data.provisionOfModuleCover;
							delete data.message;

							delete data._id;
							delete data.resetToken;
							delete data.updatedAt;
							delete data.formattedDate
							updateApi(param, data)

						})
						.catch((err) => {
							dispatch(handleLoader(false));
							Toast.error("something went to wrong!!");
						});
				}
			} else {

				dispatch(handleLoader(true));
				data.formNameId = selectedFormId;
				data.isDraft = false;
				data.requestForChanges = false;
				data.isReviewerApproved = false;
				data.isWriterApproved = false;
				data.isApproved = false;
				data.isArchived = false;

				if (data._id == '') {
					delete data._id;
				}

				delete data.otpExpireIn;
				delete data.path;
				delete data.writerId;

				delete data.message;
				delete data.resetToken;
				delete data.updatedAt;
				if (data?.deviceLabeling?.existingOwnershipNotices) {
					let find = currentForm?.find((x) => x.name == "existingOwnershipNotices");
					if (find?.value) {
						data.deviceLabeling.existingOwnershipNotices = find?.value;
					} else {
						data.deviceLabeling.existingOwnershipNotices =
							data?.deviceLabeling?.existingOwnershipNotices;
					}
				} else {
					delete data?.deviceLabeling?.existingOwnershipNotices;
				}
				ApiSaveList(data)
					.then((res) => {
						if (res.success) {
							Toast.success(res.message);
							setViewerShow(false);
							setIsDefaultCheck(false);
							router.push('/pdf');
							resetHandler();
							dispatch(handleLoader(false));
						} else {
							dispatch(handleLoader(false));
							Toast.error(res.message);
						}
					})
					.catch((err) => {
						dispatch(handleLoader(false));
						Toast.error("something went to wrong!!");
					});
			}
		}
	};
	const handleApproveForm = () => {
		handleSubmit(onSubmit)();
		setIsApprroveModalOpen(false);
	}
	const resetHandler = () => {
		reset();
		reset({
			customer: {
				customerNumber: '', // Clear the "customerNumber" field
			},
		});
		localStorage.removeItem('draftData')
		currentForm?.map((el) => {
			if (el.value) {
				el.value = "";
			}
		});
	};

	const handleClose = () => {
		reset();
		currentForm?.map((el) => {
			if (el.value) {
				el.value = "";
			}
		});

	};

	const changeHandler = (val, el, index, type) => {
		formData[selectedForm][index].value = val;
	};


	const checkEditField = (sectionName, fieldName) => {
		let checkField = sectionName ? `${sectionName}.${fieldName}` : fieldName

		if (editArr.includes(checkField)) {
			return "red_input"
		}
		else {
			return ""
		}
	}
	const Input = (el, index) => {

		return (
			<>
				<Controller
					id={`${el.section}.${el.name}`}
					name={`${el.section}.${el.name}`}
					defaultValue={el.value}
					disabled={el.autoDisabled ? true : isDisabled}
					control={control}
					rules={{
						required: el.required ? `This Field is Required !!` : undefined,
					}}
					render={({ field }) => (
						<>
							<TextField
								className={checkEditField(el.section, el.name)}
								id={`${el.section}.${el.name}`}
								type={el.type}
								fullWidth
								value={field.value}
								{...field}
								onChange={(e) => {
									field.onChange(e.target.value);
									changeHandler(e.target.value, el, index);
								}}
								error={!!errors[el.section] && !!errors[el.section][el.name]}
								helpertext={
									errors[el.section] &&
									errors[el.section][el.name] &&
									errors[el.section][el.name].message
								}
							/>
							{errors[el.section] && errors[el.section][el.name] && (
								<p className="error">
									{errors[el.section][el.name] &&
										errors[el.section][el.name].message}
								</p>
							)}
						</>

					)}

				/>
			</>
		);
	};

	const DatePickerInput = (el, index) => {
		return (
			<>
				<Controller
					name={`${el.section}.${el.name}`}
					control={control}
					rules={{ required: "This Field is Required !!" }}
					defaultValue={
						el.value
							? new Date(moment(el.value, "DD.MM.YYYY").format("YYYY-MM-DD"))
							: null
					}
					render={({ field }) => (
						<>
							<DatePicker
								id={`${el.section}.${el.name}`}
								className={
									errors[el.section] && errors[el.section][el.name]
										? "date_error date_picker"
										: "date_picker"
								}
								format="dd.MM.yyyy"
								disabled={true}
								cleanable={false}
								placeholder="DD.MM.YYYY"
								value={
									field.value &&
									new Date(
										moment(field.value, "DD.MM.YYYY").format("YYYY-MM-DD")
									)
								}
								onChange={(value) => {
									changeHandler(moment(value).format("DD.MM.YYYY"), el, index);
									field.onChange(value);
								}}
							/>
							{errors[el.section] && errors[el.section][el.name] && (
								<p className="error">
									{errors[el.section][el.name] &&
										errors[el.section][el.name].message}
								</p>
							)}
						</>
					)}
				/>
			</>
		);
	};

	const radio = (el, index) => {
		return (

			<div className="radion_input">
				<Controller
					name={`${el.section}.${el.name}`}

					control={control}
					defaultValue={el.value}
					rules={{
						required: el.required ? `This Field is Required !!` : undefined,
					}}
					render={({ field }) => {
						return (
							<RadioGroup
								className={checkEditField(el.section, el.name)}
								name="radio-buttons-group"
								id={`${el.section}.${el.name}`}
								value={field.value}
								onChange={(e) => {
									field.onChange(e.target.value);
									changeHandler(e.target.value, el, index, "radio");
								}}
							>
								{el.sub?.map((subOption, subIndex) => (
									<FormControlLabel

										disabled={isDisabled}
										key={subIndex}
										value={subOption.value}
										control={<Radio />}
										label={subOption.label}
									/>
								))}
							</RadioGroup>
						);
					}}
				/>

				{errors[el.section] && errors[el.section][el.name] && (
					<p className="error">
						{errors[el.section][el.name] && errors[el.section][el.name].message}
					</p>
				)}
			</div>
		);
	};


	const select = (el, index) => {

		if (
			el.name == "deliveryStatusTariffClassification" &&
			formulaFile.includes(selectedForm)
		) {

			if (watch(`configuration.measuringMechanism`) == "+A mit Rücklaufsperre = 1") {
				el.sub = [
					{ label: "1.8.0", value: "1.8.0" },
					{ label: "1.8.1, 1.8.2", value: "1.8.1, 1.8.2" },
				];
			}
			else if (watch(`configuration.measuringMechanism`) == "-A mit Rücklaufsperre = 3" ||
				watch(`configuration.measuringMechanism`) == "-A saldierend = 4"
			) {
				el.sub = [
					{ label: "2.8.0", value: "2.8.0" },
					{ label: "2.8.1, 2.8.2", value: "2.8.1, 2.8.2" },
				];
			}
			else if (watch(`configuration.measuringMechanism`) == "+A / -A = 2") {


				if ((watch(`configuration.automaticTariffActivation`) == "Variante T") ||
					(watch(`configuration.tariffCounters`) == "Typ T" && watch(`configuration.measuringMechanism`) == "+A / -A = 2") ||
					(watch(`configuration.measuringMechanism`) == "+A / -A = 2") && watch(`configuration.tariffCounters`) == "Typ TH" && watch(`configuration.automaticTariffActivation`) == undefined) {
					el.sub = [
						{ label: "1.8.0, 2.8.0", value: "1.8.0, 2.8.0" },
						{ label: "1.8.1, 1.8.2, 2.8.0", value: "1.8.1, 1.8.2, 2.8.0" },
						{ label: "1.8.0, 2.8.1, 2.8.2", value: "1.8.0, 2.8.1, 2.8.2" },
						{ label: "1.8.1, 1.8.2, 2.8.1, 2.8.2", value: "1.8.1, 1.8.2, 2.8.1, 2.8.2" },
					];
				}

				else if (
					(watch(`configuration.automaticTariffActivation`) == "Variante V") ||
					(watch(`configuration.tariffCounters`) == "Typ V" && watch(`configuration.measuringMechanism`) == "+A / -A = 2" && watch(`configuration.automaticTariffActivation`) == undefined)) {
					el.sub = [
						{ label: "1.8.0, 2.8.0", value: "1.8.0, 2.8.0" },
						{ label: "1.8.1, 1.8.2, 2.8.0", value: "1.8.1, 1.8.2, 2.8.0" },
					];
				}

				else if (
					(watch(`configuration.automaticTariffActivation`) == "Variante E") ||
					(watch(`configuration.tariffCounters`) == "Typ E" && watch(`configuration.measuringMechanism`) == "+A / -A = 2" && watch(`configuration.automaticTariffActivation`) == undefined)) {
					el.sub = [
						{ label: "1.8.0, 2.8.0", value: "1.8.0, 2.8.0" },
						{ label: "1.8.0, 2.8.1, 2.8.2", value: "1.8.0, 2.8.1, 2.8.2" },
					];
				}
			}

		}

		if (
			el.name == "tariffControl230VAtTerminal13" &&
			formulaFile.includes(selectedForm)
		) {
			if (
				(watch(`configuration.tariffCounters`) == "Typ T" &&
					watch(`configuration.measuringMechanism`) ==
					"+A mit Rücklaufsperre = 1") ||
				(watch(`configuration.tariffCounters`) == "Typ T" &&
					watch(`configuration.measuringMechanism`) == "+A / -A = 2") ||
				(watch(`configuration.tariffCounters`) == "Typ V" &&
					watch(`configuration.measuringMechanism`) == "+A / -A = 2")
			) {
				el.sub = [
					{ label: "1.8.1 aktiv", value: "1.8.1 aktiv" },
					{ label: "1.8.2 aktiv", value: "1.8.2 aktiv" },
				];
			} else if (
				(watch(`configuration.tariffCounters`) == "Typ T" &&
					watch(`configuration.measuringMechanism`) ==
					"-A mit Rücklaufsperre = 3") ||
				(watch(`configuration.tariffCounters`) == "Typ T" &&
					watch(`configuration.measuringMechanism`) == "-A saldierend = 4") ||
				(watch(`configuration.tariffCounters`) == "Typ E" &&
					watch(`configuration.measuringMechanism`) == "+A / -A = 2")
			) {
				el.sub = [
					{ label: "2.8.1 aktiv", value: "2.8.1 aktiv" },
					{ label: "2.8.2 aktiv", value: "2.8.2 aktiv" },
				];
			} else {
				el.sub = [
					{ label: "1.8.1 aktiv", value: "1.8.1 aktiv" },
					{ label: "1.8.2 aktiv", value: "1.8.2 aktiv" },

				];
			}
		}


		if (el.name == "tariffCounters" && selectedForm == "DVS76" ||
			el.name == "tariffCounters" && selectedForm == "DVS74" ||
			el.name == "tariffCounters" && selectedForm == "WS76"
		) {
			if (watch(`configuration.measuringMechanism`) == "+A / -A = 2") {
				el.sub = [


					{ label: "1 Tarif", value: "1 Tarif" },
					{
						label: "2 Tarife für alle verfügbaren Energierichtung (Typ T)",
						value: "Typ T",
					},
					{
						label: "2 Tarife Bezug +A (Typ V)- gilt nur für Zweirichtungszähler",
						value: "Typ V",
					},
					{
						label:
							"2 Tarife Lieferung –A (Typ E),gilt nur für Zweirichtungszähler",
						value: "Typ E",
					},
				]
			}
			else {
				el.sub = [
					{ label: "1 Tarif", value: "1 Tarif" },
					{
						label: "2 Tarife für alle verfügbaren Energierichtung (Typ T)",
						value: "Typ T",
					},
				]
			}
		}


		return (
			<>
				<Controller
					key={index}
					name={`${el.section}.${el.name}`}
					defaultValue={el.value}
					disabled={isDisabled}
					control={control}
					rules={{
						required: el.required ? `This Field is Required !!` : undefined,
					}}
					render={({ field }) => (
						<>
							<Select
								fullWidth
								className={checkEditField(el.section, el.name)}
								id={`${el.section}.${el.name}`}
								input={<OutlinedInput />}
								value={field.value || el.value}
								{...field}
								onChange={(event) => {
									field.onChange(event.target.value);
								}}
								error={
									el.section === ""
										? !!errors[el.name]
										: !!errors[el.section] && !!errors[el.section][el.name]
								}
								helperText={
									el.section === ""
										? !!errors[el.name]
										: errors[el.section] &&
										errors[el.section][el.name] &&
										errors[el.section][el.name].message
								}
							>
								{el.sub.map((name, i) => (
									<MenuItem key={i} value={name.value}>
										{name.label}
									</MenuItem>
								))}
							</Select>
							{
								errors[el.section] && el.section === "" ?
									errors[el.name] && <p className="error">{errors[el.name]?.message}</p> :
									errors[el.section] && errors[el.section][el.name] && (
										<p className="error">
											{errors[el.section][el.name]?.message}
										</p>

									)
							}
						</>
					)}
				/>
			</>
		);
	};

	const getSpecificationData = async (InputValue) => {
		let data = {
			"customerNumber": InputValue
		}
		await ApiSpecificatioData(data)
			.then((res) => {
				if (res.success) {
					setIsDefaultCheck(res.data.isDefault);
					const data = res?.data?.customerSpecification;
					setValue('customerSpecification.deliveryNoteValue', data?.deliveryNoteValue || '');
					setValue('customerSpecification.modeOfTransport', data?.modeOfTransport || '');
					setValue('customerSpecification.electronicInvoiceValue', data?.electronicInvoiceValue || '');
					setValue('customerSpecification.electronicInvoiceEmail', data?.electronicInvoiceEmail || '');
					setValue('customerSpecification.packaging', data?.packaging || '');
					setValue('customerSpecification.specialFeaturesPackaging', data?.specialFeaturesPackaging || '');
					setValue('customerSpecification.provisionOfTerminalCover', data?.provisionOfTerminalCover || '');
					setValue('customerSpecification.packagingTerminalCover', data?.packagingTerminalCover || '');
					setValue('customerSpecification.terminalBlockScrews', data?.terminalBlockScrews || '');
					setValue('customerSpecification.deliveryAddressDifferentFromStandardAddress', data?.deliveryAddressDifferentFromStandardAddress || '');
					setValue('customerSpecification.deliveryAddress', data?.deliveryAddress || '');
					setValue('customerSpecification.deliveryTimesNote', data?.deliveryTimesNote || '');
					setValue('customerSpecification.deliveryTimes', data?.deliveryTimes || '');
					setValue('customerSpecification.instructionsForDelivery', data?.instructionsForDelivery || '');
					setValue('customerSpecification.notification', data?.notification || '');
					setValue('customerSpecification.particularities', data?.particularities || '');
					setValue('customerSpecification.provisionOfModuleCover', data?.provisionOfModuleCover || '');
					setValue('customerSpecification.packagingModulecover', data?.packagingModulecover || '');
					// trigger(['customerSpecification'])
					dispatch(handleLoader(false));
				} else {
					dispatch(handleLoader(false));
				}
			})
	}

	const ContactPerson = async (value) => {
		let item = []
		const data = { customerNumber: value };
		try {
			const res = await ApiSearchContactPerson(data);
			if (res.success) {
				res.data.map((el) => {
					el.contactPerson != '' &&
						item.push({
							label: el.contactPerson,
							value: el.contactPerson,
						})
				})
				setContactPersonoptions(item)
			} else {
				Toast.error(res.message);
				return [];
			}
		} catch (error) {
			Toast.error(res.message);
			return [];
		}
	}

	const searchCustomer = async (newInputValue) => {
		try {
			let item = []
			const data = { search: newInputValue };
			const res = await ApiSearchCustomerNumber(data);
			if (res.success) {
				res.data.map((el) => {
					item.push({
						label: el.customer.customerNumber + ' - ' + el.customer.customerName,
						value: el.customer.customerNumber,
						contactPerson: el.customer.contactPerson,
						contactName: el.customer.customerName,
						email: el.customer.email
					})
				})
				setoptions(item)
			} else {
				Toast.error(res.message);
				return [];
			}
		} catch (err) {
			Toast.error("Something went wrong!");
			return [];
		}
	}

	const SearchWithOptions = (el, index) => {
		return (
			<>
				<Controller
					key={index}
					name={`${el.section}.${el.name}`}
					defaultValue={el?.value}
					control={control}
					rules={{
						required: el.required ? `This Field is Required !!` : undefined,
					}}
					render={({ field }) => (
						<FormControl fullWidth>
							<Autocomplete
								className="type_with_Search"
								{...field}
								options={options}
								value={watch(`${el.section}.${el.name}`) || ''}
								freeSolo
								includeInputInList
								clearIcon={null}
								renderInput={(params) => <TextField {...params} label="" variant="outlined"
									error={!!errors[el.section]?.[el.name]} />}
								onInputChange={(e, newInputValue) => {
									if (e != null) {
										setContactPersonoptions([])
										setValue('customer.contactPerson', '')
										field.onChange(e);
										const existingOption = options.find(data => data.label === newInputValue);
										setValue('customer.customerNumber', newInputValue || existingOption?.value);
										if (newInputValue.length >= 3 && !isDisabled) {
											setValue('customer.email', existingOption?.email);
											setValue('customer.customerName', existingOption?.contactName);
										}
										if (!existingOption && newInputValue.length >= 3 && !isDisabled) {
											searchCustomer(newInputValue);

										} else {
											setoptions([]);
										}
									}
								}}
								onChange={(e, selectedOption) => {
									setContactPersonoptions([]);
									setValue('customer.contactPerson', '')
									if (selectedOption && !isDisabled) {
										getSpecificationData(selectedOption.value);
										setValue('customer.customerNumber', selectedOption?.value);
										setValue('customer.email', selectedOption.email);
										setValue('customer.customerName', selectedOption?.contactName);
										trigger('customer.email');
										ContactPerson(selectedOption?.value)
									}
								}}
								disabled={isDisabled}
							/>
							{errors[el.section] && errors[el.section][el.name] && (
								<p className="error">{errors[el.section][el.name].message}</p>
							)}
						</FormControl>
					)}
				/>
			</>
		);
	};


	const CreatableMenu = (el, index) => {
		const colourStyles = {
			option: (styles, { data, isDisabled, isFocused, isSelected }) => {
				return {
					...styles,
					backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : isFocused ? 'rgba(0, 0, 0, 0.04)' : null,
					color: 'black',
					fontSize: "1rem"
				};
			},
			singleValue: (defaultStyles) => ({ ...defaultStyles, fontSize: "1rem" }),
		};
		return (
			<>
				<Controller
					key={index}
					name={`${el.section}.${el.name}`}
					control={control}
					render={({ field }) => (
						<FormControl fullWidth>
							<CreatableSelect
								isClearable
								className={isDisabled ? "disabled-select" : "simple-select"}
								isDisabled={isDisabled}
								value={param ? contactPersonoptions.find((item) => item.value == getValues()?.customer?.contactPerson) || { label: getValues()?.customer?.contactPerson, value: getValues()?.customer?.contactPerson } : { label: getValues()?.customer?.contactPerson, value: getValues()?.customer?.contactPerson }}
								options={contactPersonoptions}
								onChange={(e) => {
									setValue('customer.contactPerson', e?.value || '');
								}}
								styles={colourStyles}
							/>
						</FormControl>
					)}
				/>
			</>
		);
	};
	const convertToBase64 = (file, callback) => {
		if (file != undefined) {
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = () => {
				callback(reader.result);
			};
			reader.onerror = (error) => {
				Toast.error("somthing went wrong !!");
			};
		}
	};

	const changeFormHandler = (val) => {

		reset()
		unregister();
		const selectedOption = list.find((option) => option.value === val);
		let data = formData[selectedOption?.label]
		setcurrentForm(...data);

		let obj = getValues()
		for (let key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				delete obj[key];

			} else {
				delete obj[key];
			}
		}
		reset(obj)

	};

	const getUser = () => {

		ApiProfileDetails()
			.then((res) => {
				if (res.success) {
					setValue('customer.date', moment(new Date()).format('DD.MM.YYYY'))
					setValue('customer.createdBy', res.data.name)
					setSalesArea(res.data.salesArea[0])
					setLoginUser(res.data)
				}
				else {

				}
			}).catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("Something went wrong!!");
			});
	};

	useEffect(() => {
		if (!param) {
			getUser();
		}
		let IsCopy = localStorage.getItem("isCopy")
		if (IsCopy === "true") {
			setisDisabled(false)
		}
	}, [param]);

	useEffect(() => {

		if (formulaFile.includes(selectedForm)) {

			let arr;
			let name;
			if (selectedForm) {
				name = selectedForm.replace("Typ ", "");
				arr = name.split("");
			}
			if (arr) {
				if (watch(`configuration.twoWireOperation`) === "L3") {
					arr[1] = "W";
				}
				if (watch(`configuration.deviceVersion`) === "LCM1") {
					arr[1] = "W";
				}

				if (
					watch(`configuration.currentInformationlMax`) != "" &&
					watch(`configuration.currentInformationlRef`) != ""
				) {
					if (watch(`configuration.currentInformationlRef`) == 10 && watch(`configuration.currentInformationlMax`) == 40) {
						arr[5] = "04";
					}
					if (watch(`configuration.currentInformationlRef`) == 10 && watch(`configuration.currentInformationlMax`) == 60) {
						arr[5] = "06";
					}
					if (watch(`configuration.currentInformationlRef`) == 5 && watch(`configuration.currentInformationlMax`) == 40) {
						arr[5] = "08";
					}
					if (watch(`configuration.currentInformationlRef`) == 10 && watch(`configuration.currentInformationlMax`) == 85) {
						if (selectedForm == "WS74") {
							arr[5] = "09";
						}
						else {
							arr[5] = "08";
						}

					}
					if (watch(`configuration.currentInformationlRef`) == 10 && watch(`configuration.currentInformationlMax`) == 100) {
						arr[5] = "10";
					}
					if (watch(`configuration.currentInformationlRef`) == 5 && watch(`configuration.currentInformationlMax`) == 60) {
						arr[5] = "12";
					}
					if (watch(`configuration.currentInformationlRef`) == 5 && watch(`configuration.currentInformationlMax`) == 85) {
						arr[5] = "17";
					}
					if (watch(`configuration.currentInformationlRef`) == 5 && watch(`configuration.currentInformationlMax`) == 100) {
						arr[5] = "20";
					}
				}

				if (name == "DVZE" || name == "DVS76" || name == "WS76") {
					if (watch(`configuration.currentInformationlRef`) == 5) {
						arr[5] = "12";
					}
					if (watch(`configuration.currentInformationlRef`) == 10) {
						arr[5] = "06";
					}
				}



				if (
					watch(`configuration.measuringMechanism`) != ""
				) {
					if (
						watch(`configuration.measuringMechanism`) == "+A mit Rücklaufsperre = 1"
					) {
						arr[8] = ".1";
					} else if (watch(`configuration.measuringMechanism`) == "+A / -A = 2") {
						arr[8] = ".2";
					} else if (
						watch(`configuration.measuringMechanism`) == "-A mit Rücklaufsperre = 3"
					) {
						arr[8] = ".3";
					} else if (
						watch(`configuration.measuringMechanism`) == "-A saldierend = 4"
					) {
						arr[8] = ".4";
					}
				}



				if (
					watch(`configuration.tariffCounters`) != "1 Tarif" &&
					watch(`configuration.tariffCounters`) != ""
				) {
					if (watch(`configuration.tariffCounters`) == "Typ T") {
						arr[9] = "T";
					} else if (watch(`configuration.tariffCounters`) == "Typ V") {
						arr[9] = "V";
					} else if (watch(`configuration.tariffCounters`) == "Typ E") {
						arr[9] = "E";
					}
				}

			}


			if (name == "WS74") {
				if (watch(`configuration.tariffCounters`) == 'Typ TH') {
					arr[9] = "T";
				}
			}

			if (name == "DVSB") {
				if (watch(`configuration.tariffCounters`) == 'Typ H') {
					arr[9] = "H";
				}
				else if (watch(`configuration.tariffCounters`) == 'Typ TH') {
					arr[9] = "TH";
				}
			}



			let joinArr = arr.join("");
			if (name == "DVH4013" && watch('configuration.deviceVersion')) {
				if (watch(`configuration.deviceVersion`) == "LCM1") {
					joinArr = joinArr + '-' + 'LCM'
				}
				else if (watch(`configuration.deviceVersion`) == "LCM3") {
					joinArr = joinArr + '-' + 'LCM'
				}
				else {
					joinArr = joinArr + '-' + watch('configuration.deviceVersion')
				}

			}
			if (name == "DVS74" || name == "WS74" || name == "DVZE") {
				joinArr = joinArr + '.G2'
			}
			if (name == "DVSBR") {
				joinArr = joinArr + '.5H'
			}




			setValue("configuration.type", joinArr);
			setType(joinArr);
		}
		else {
			let item = selectedForm?.replace("Typ ", "");
			setType(item)
			setValue("configuration.type", item);
		}

		if (selectedForm == "LWMOD-R4" && watch(`configuration.deviceType`)) {
			setValue("configuration.type", watch(`configuration.deviceType`));
		}

		if (selectedForm == "Mobile Zähler") {
			setValue("configuration.type", watch(`configuration.deviceVersion`) || 'MDZ');
		}

		if (selectedForm == "LW-PlugIn" && watch(`configuration.deviceType`)) {
			setValue("configuration.type", watch(`configuration.deviceType`));
		}

	}, [getValues()]);



	const isUnmounted = useRef(false);
	useEffect(() => {
		if (typeof window !== "undefined" && localStorage.getItem("isWriter")) {
			const handleBeforeUnload = () => {
				if (!isUnmounted.current) {
					localStorage.removeItem("isWriter");
					localStorage.removeItem("isWriterView");
				}
			};
			window.addEventListener("beforeunload", handleBeforeUnload);
			return () => {
				isUnmounted.current = true;
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}
	}, []);

	useEffect(() => {
		reset();
	}, [selectedForm]);


	function displayImagePreview(file, index) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const preview = document.getElementById(`preview_image${index}`);
			preview.src = e.target.result;
		};
		reader.readAsDataURL(file);
	}

	const updateApi = (param, sendData) => {
		ApiUpdateList(param, sendData)
			.then((res) => {
				if (res.success) {
					Toast.success(res.message);

					if (param) {
						reset();
						viewData();
					}
					else {
						draftDataHandler()
					}

					dispatch(handleLoader(false));
					router.push('/pdf');
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went to wrong!!");
			});
	}

	const draftHandler = () => {

		dispatch(handleLoader(true));

		let data = getValues();

		delete data.createdAt;
		delete data.otpCode;
		delete data.otpExpireIn;
		delete data.path;
		delete data.resetToken;
		delete data.updatedAt;
		delete data.formNameId;
		delete data.writerId;


		data.customer.createdBy = loginUser.name || otherData.customer.createdBy;
		data.customer.date = moment(new Date()).format("DD.MM.YYYY");
		data.customer.salesArea = salesArea;
		data.configuration.type = type;
		data.requestForChanges = false;
		data.isReviewerApproved = false;
		data.isWriterApproved = false;
		data.isApproved = false;
		data.isArchived = false;
		data.isDraft = true;
		data.formNameId = selectedFormId;

		if (data?.deviceLabeling?.existingOwnershipNotices) {
			let find = currentForm?.find((x) => x.name == "existingOwnershipNotices");
			if (find?.value) {
				data.deviceLabeling.existingOwnershipNotices = find?.value;
			} else {
				data.deviceLabeling.existingOwnershipNotices =
					data?.deviceLabeling?.existingOwnershipNotices;
			}
		} else {
			delete data?.deviceLabeling?.existingOwnershipNotices;
		}

		if (data?.remarkImage) {
			let find = currentForm?.find((x) => x.name == "remarkImage");
			if (find?.value) {
				data.remarkImage = find?.value;
			} else {
				data.remarkImage = data?.remarkImage;
			}
		} else {
			delete data?.remarkImage;
		}

		let checkId = data._id;
		if (data._id) {
			localStorage.removeItem('draftData');
			updateApi(checkId, data)
		}
		else {
			delete data._id;
			if (data?.deviceLabeling?.existingOwnershipNotices) {
				let find = currentForm?.find((x) => x.name == "existingOwnershipNotices");
				if (find?.value) {
					data.deviceLabeling.existingOwnershipNotices = find?.value;
				} else {
					data.deviceLabeling.existingOwnershipNotices =
						data?.deviceLabeling?.existingOwnershipNotices;
				}
			} else {
				delete data?.deviceLabeling?.existingOwnershipNotices;
			}

			if (data?.remarkImage) {
				let find = currentForm?.find((x) => x.name == "remarkImage");
				if (find?.value) {
					data.remarkImage = find?.value;
				} else {
					data.remarkImage =
						data?.remarkImage;
				}
			} else {
				delete data?.remarkImage;
			}
			ApiSaveList(data)
				.then((res) => {
					if (res.success) {
						reset();
						unregister()
						localStorage.removeItem('draftData')
						Toast.success(res.message);
						setViewerShow(false);
						resetHandler();
						draftDataHandler()
						dispatch(handleLoader(false));
					} else {
						dispatch(handleLoader(false));
						Toast.error(res.message);
					}
				})
				.catch((err) => {
					dispatch(handleLoader(false));
					Toast.error("something went to wrong!!");
				});
		}

	}

	const draftDataHandler = () => {

		if (typeof window !== "undefined" && localStorage.getItem('draftData') && JSON.parse(localStorage.getItem('draftData'))) {
			reset(JSON.parse(localStorage.getItem('draftData')))
			setSelectedFormId(getValues()?.formNameId)
		}
		else {
			let item = setValuesToBlank(getValues());
			reset(item)
			unregister();
		}
	}

	function setValuesToBlank(obj) {
		for (let key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				setValuesToBlank(obj[key]);

			} else {
				obj[key] = "";
			}
		}
		return obj;
	}

	useEffect(() => {
		draftDataHandler()
	}, [typeof window !== "undefined" && localStorage.getItem('draftData')]);


	const handleDefaultCheck = (e) => {
		setIsDefaultCheck(!isDefaultCheck);
	}

	return (
		<>
			{
				isOpen ?
					<div className="not_found">
						<h2>{msg}</h2>
					</div>

					:
					<div className="form_container">
						<div className="form_head_link">
							<div>
								{typeof window !== "undefined" &&
									localStorage.getItem("isWriter") &&
									param && (
										<Button
											variant="outlined"
											onClick={() => {
												router.push("/pdf");
												localStorage.removeItem("isWriter");
												localStorage.removeItem("isWriterView");
											}}
										>
											Back to The Form
										</Button>
									)}
							</div>
							<div>
								{typeof window !== "undefined" &&
									localStorage.getItem("isWriterView") == "true"
									? ""
									: param && (
										""
									)}
							</div>
						</div>
						<Card className='table_card_style form_style form top_form_Section'>
							<Box>
								<InputLabel >Erstellt Von </InputLabel>
								<TextField
									type="text"
									fullWidth
									value={loginUser?.name || otherData?.customer?.createdBy}
									disabled
								/>
							</Box>
							<Box>
								<InputLabel >Erstellung Datum </InputLabel>
								<TextField
									type="text"
									fullWidth
									value={moment(new Date()).format("DD.MM.YYYY")}
									disabled
								/>
							</Box>
							<Box>
								<InputLabel >Vertriebsgebiet
									<span className="validation">
										{" "}
										{"*"}
									</span> </InputLabel>

								{
									param ?
										<TextField
											type="text"
											fullWidth
											value={otherData?.customer?.salesArea}
											disabled
										/>
										:
										<Select
											fullWidth
											className="user_select"
											input={<OutlinedInput />}
											value={salesArea}
											onChange={(event) => {
												setSalesArea(event.target.value);
											}}
										>

											{loginUser?.salesArea?.map((el, i) => (
												<MenuItem value={el} key={i}>{el}</MenuItem>
											))}
										</Select>
								}
							</Box>

						</Card>

						<FormList
							changeFormHandler={changeFormHandler}
							list={list}
							setList={setList}
							otherData={otherData}
							param={param}
							setcurrentForm={setcurrentForm}
							reset={reset}
							selectedForm={selectedForm}
							setSelectedForm={setSelectedForm}
							setSelectedFormId={setSelectedFormId}
							selectedFormId={selectedFormId}
						/>

						<Card className="table_card_style form_style">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="form"
								id="myForm"
							>
								<Grid container spacing={2} item>
									{currentForm &&
										currentForm?.map((el, index) => (
											<Grid item
												key={index}
												className={`form_section_container`}
												sm={el.sectionTitle || el.subsection ? 12 : 6}
												style={{
													display: (el.dependentName && !el.dependentValue.includes(watch(`${el.section}.${el.dependentName}`))
														||
														el.subDepedentName && !el.subDepedentValue.includes(watch(`${el.section}.${el.subDepedentName}`))
													) ? 'none' : 'block'
												}}
											>
												{el.sectionTitle && (
													el.sectionName == "customerSpecification" ?
														<>
															<div className="checkbox_placment form_section">

																<h4 className="first_child">
																	{el.sectionTitle}
																</h4>
																<div>
																	<FormControlLabel
																		control={
																			<Checkbox
																				name='isDefault'
																				checked={isDefaultCheck}
																				onChange={(e) => handleDefaultCheck(e, el)}
																			/>
																		}
																		label="Make Default"
																	/>
																</div>
															</div>
														</>

														:
														<h4 className="form_section first_child">
															{el.sectionTitle}
														</h4>

												)}
												{el.subsection && <h5>{el.subsection}</h5>}
												{el.type == "createbleOption" ?
													<>
														<InputLabel>
															{el.label}{" "}
															<span className="validation">{el.required ? "*" : ""}</span>
														</InputLabel>
														{CreatableMenu(el, index)}

													</> :
													el.type == 'searchWithOption' ?
														<>
															<InputLabel>
																{el.label}{" "}
																<span className="validation">{el.required ? "*" : ""}</span>
															</InputLabel>
															{SearchWithOptions(el, index)}
														</>
														:

														el.type === "text" ||
															el.type === "number" ||
															el.type === "time" ? (
															<>{

																el.dependentName != undefined ? (
																	el.dependentValue.includes(
																		watch(`${el.section}.${el.dependentName}`)
																	) && (
																		<div className="input_form">
																			<InputLabel htmlFor={`${el.section}.${el.name}`}>
																				{el.label}
																				<span className="validation">
																					{" "}
																					{el.required ? "*" : ""}
																				</span>
																			</InputLabel>
																			{Input(el, index, el.type)}
																		</div>
																	)
																) : (
																	<div className="input_form">
																		<InputLabel htmlFor={`${el.section}.${el.name}`} className={el.label === "Email für SML Versand" ? "none" : "capitalze"}>
																			{el.label}{" "}
																			<span className="validation">
																				{" "}
																				{el.required ? "*" : ""}
																			</span>
																		</InputLabel>
																		{Input(el, index, el.type)}
																	</div>
																)
															}


															</>
														)


															: el.type == "date" ? (
																<>
																	<InputLabel htmlFor={`${el.section}.${el.name}`}>
																		{el.label}
																		<span className="validation">
																			{" "}
																			{el.required ? "*" : ""}
																		</span>
																	</InputLabel>
																	{DatePickerInput(el, index, el.type)}
																</>
															)
																: el.type == "select" ? (
																	<>
																		{
																			el.subDepedentName !== undefined && el.dependentName !== undefined ?
																				(el.dependentValue.includes(watch(`${el.section}.${el.dependentName}`)) &&
																					el.subDepedentValue.includes(watch(`${el.section}.${el.subDepedentName}`)))
																				&& (
																					<>
																						<InputLabel >
																							{el.label}{" "}
																							<span className="validation">
																								{el.required ? "*" : ""}
																							</span>
																						</InputLabel>
																						{select(el, index)}
																					</>
																				)

																				:


																				el.dependentName != undefined && el.subDepedentName == undefined ? (
																					el.dependentValue.includes(
																						watch(`${el.section}.${el.dependentName}`)
																					) && (
																						<>
																							<InputLabel >
																								{el.label}{" "}
																								<span className="validation">
																									{el.required ? "*" : ""}
																								</span>
																							</InputLabel>
																							{select(el, index)}
																						</>
																					)
																				) : (
																					<>
																						<InputLabel >
																							{el.label}{" "}
																							<span className="validation">
																								{el.required ? "*" : ""}
																							</span>
																						</InputLabel>
																						{select(el, index)}
																					</>
																				)}
																	</>
																)
																	: el.type === "textarea" ? (
																		<>
																			<InputLabel >
																				{el.label}
																				<span className="validation">
																					{" "}
																					{el.required ? "*" : ""}
																				</span>
																			</InputLabel>

																			<Controller

																				name={el.section ? `${el.section}.${el.name}` : el.name}
																				control={control}
																				defaultValue={el?.value}
																				disabled={isDisabled}
																				rules={{
																					required: el.required
																						? `This Field is Required !!`
																						: undefined,
																				}}
																				render={({ field }) => (
																					<TextField
																						className={checkEditField(el.section, el.name)}
																						multiline
																						id={`${el.section}.${el.name}`}
																						rows="4"
																						cols="50"
																						fullWidth
																						{...field}
																						onChange={(e) => {
																							field.onChange(e.target.value);
																							changeHandler(e.target.value, el, index);
																						}}
																						error={
																							!!errors[el.section]
																								? !!errors[el.section] &&
																								!!errors[el.section][el.name]
																								: !!errors[el.name]
																						}
																						helpertext={
																							errors[el.section]
																								? errors[el.section] &&
																								errors[el.section][el.name] &&
																								errors[el.section][el.name].message
																								: errors[el.name] && errors[el.name].message
																						}
																					/>
																				)}
																			/>
																		</>
																	)
																		: el.type == "radio" ? (
																			<>

																				{

																					el.dependentName != undefined ? (
																						el.dependentValue.includes(
																							watch(`${el.section}.${el.dependentName}`)
																						) && (
																							<div className="input_form">
																								<InputLabel htmlFor={`${el.section}.${el.name}`}>
																									{el.label}
																									<span className="validation">
																										{" "}
																										{el.required ? "*" : ""}
																									</span>
																								</InputLabel>
																								{radio(el, index)}
																							</div>
																						)
																					) : (
																						<div className="input_form">
																							<InputLabel htmlFor={`${el.section}.${el.name}`}>
																								{el.label}{" "}
																								<span className="validation">
																									{" "}
																									{el.required ? "*" : ""}
																								</span>
																							</InputLabel>
																							{radio(el, index)}
																						</div>
																					)
																				}
																			</>
																		)
																			: el.type == "file" ? (
																				<>
																					<Controller
																						name={el.section ? `${el.section}.${el.name}` : el.name}
																						defaultValue={null}
																						control={control}
																						rules={{
																							required: el.required ? `This Field is Required !!` : undefined,
																						}}
																						render={({ field }) => {
																							return <>
																								<input
																									className={`${checkEditField(el.section, el.name)} file_input`}
																									type={"file"}
																									accept="image/jpeg, image/jpg"
																									disabled={isDisabled}
																									fullWidth
																									onChange={(e) => {
																										let selectedFile = e.target.files[0];
																										field.onChange(e.target.value);
																										convertToBase64(selectedFile, (base64String) => {
																											changeHandler(base64String, el, index, "file");
																											setPreviewImage({ ...previewImage, [el.name]: base64String });
																										});
																										// Display selected image preview
																										displayImagePreview(e.target.files[0], index);
																									}}
																									error={
																										!!errors[el.section]
																											? !!errors[el.section] && !!errors[el.section][el.name]
																											: !!errors[el.name]
																									}
																									helpertext={
																										errors[el.section]
																											? errors[el.section] &&
																											errors[el.section][el.name] &&
																											errors[el.section][el.name].message
																											: errors[el.name] && errors[el.name].message
																									}
																								/>
																								{
																									field.value &&
																									<img src={field.value} alt="Preview" className="image_preview" id={`preview_image${index}`} onClick={() => handleOpenModal(el.name)} />
																								}
																								<Modal
																									open={openPreviewModal.isOpen}
																									onClose={handleCloseModal}
																									aria-labelledby="modal-modal-title"
																									aria-describedby="modal-modal-description"
																								>

																									<Box sx={style}>
																										<div className="header-content">
																											<h4 className="preview-header">
																												Image Preview
																											</h4>
																											<CloseIcon onClick={handleCloseModal} />
																										</div>
																										<hr />

																										{previewImage ? (
																											<img src={previewImage[openPreviewModal.fieldName]} alt="Preview" className="image_preview_modal" id={`preview_image${index}`} />) :
																											<h6> No Image found</h6>

																										}
																									</Box>
																								</Modal >
																							</>
																						}}
																					/>

																				</>
																			)
																				:
																				el.type === "checkbox" ? (
																					<>
																						<InputLabel>{el.label}</InputLabel>
																						<Controller

																							name={`${el.section}.${el.name}`}
																							control={control}
																							disabled={isDisabled}
																							defaultValue={el.value || []}
																							rules={{
																								validate: (value) => {
																									return el.required && (!value || value.length <= 0)
																										? `This Field is Required !!`
																										: clearErrors(`${el.section}.${el.name}`);
																								},
																							}}
																							render={({ field }) => (
																								<div className={`${checkEditField(el.section, el.name)} checkbox_group`}>
																									{el.sub.map((subOption, subIndex) => (


																										<FormControlLabel

																											key={subIndex}
																											control={
																												<Checkbox

																													{...field}
																													name={`${el.section}.${el.name}.${subOption}`}
																													checked={field.value.includes(subOption)}
																													onChange={(e) => {
																														const isChecked = e.target.checked;
																														const updatedOptions = isChecked
																															? [...field.value, subOption]
																															: field.value.filter((value) => value !== subOption);

																														field.onChange(updatedOptions);
																														// Optionally update formData here if needed
																													}}
																												/>
																											}
																											label={subOption}
																										/>


																									))}
																									{errors[el.section] && errors[el.section][el.name] && (
																										<p className="error">{errors[el.section][el.name].message}</p>
																									)}
																								</div>
																							)}
																						/>
																					</>
																				) : null

												}


											</Grid>
										))}


									{param ? (
										<>

											{
												localStorage.getItem("isWriterView") ==
													"true" ? null : typeof window !== "undefined" &&
														localStorage.getItem("isWriter") ? (
													<Grid container xs={12} sx={{ p: 1 }} justifyContent="center" item>
														<Button variant="contained" sx={{ m: 1 }} color="success" type="submit" onClick={() => setEditStatus("save")}>
															Speichern
														</Button>
														{
															localStorage.getItem("isCopy") ?
																<>
																</>
																:
																<Button
																	variant="contained"
																	sx={{ m: 1 }}
																	onClick={() => setisDisabled(false)}
																>
																	Bearbeiten{" "}
																</Button>
														}
													</Grid>
												) : (
													<Grid container xs={12} sx={{ p: 1 }} justifyContent="center" alignItems='center' item>
														<Button
															variant="contained"
															color="secondary"
															sx={{ m: 1 }}
															onClick={() => { setIsApprroveModalOpen(true); setEditStatus("isApproved") }}
														>
															Bestätigen
														</Button>

														{
															!localStorage.getItem("isWriter") ? "" :

																<Box className="form_edit">
																	<Button
																		variant="contained"
																		onClick={() => setisDisabled(false)}
																	>
																		Bearbeiten{" "}
																	</Button>
																</Box>
														}
													</Grid>
												)}
										</>
									) : (
										<Grid container xs={12} sx={{ p: 1 }} justifyContent="center" item
										>
											<Button
												variant="contained"
												onClick={() => handleClose()}
												color="error"
												sx={{ m: 1 }}
											>
												Clear
											</Button>
											<Button variant="contained" color="info" type="button" id="clearButton" sx={{ m: 1 }} onClick={() => draftHandler()}>
												Save as Draft
											</Button>
											<Button variant="contained" color="success" type="submit" sx={{ m: 1 }}>
												Save & Send
											</Button>
										</Grid>
									)}
								</Grid>
							</form>
						</Card>

						<AssignViewer
							submitData={submitData}
							resetHandler={resetHandler}
							viewerShow={viewerShow}
							setViewerShow={setViewerShow}
							selectedFormId={selectedFormId}
						/>
					</div>
			}

			{isApprroveModalOpen &&
				<Dialog
					open={isApprroveModalOpen}
					onClose={() => setIsApprroveModalOpen(false)}
					fullWidth
					className="modal_form"
				>
					<DialogTitle sx={{ m: 0, p: 2 }} className="dialog_title">
						Are you sure you want to Approve this form ?
					</DialogTitle>
					<IconButton
						aria-label="close"
						onClick={() => setIsApprroveModalOpen(false)}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
					<DialogActions>
						<Button
							variant="contained"
							onClick={() => setIsApprroveModalOpen(false)}
							color="error"
						>
							Close
						</Button>
						<Button
							variant="contained"
							color="success"
							type="submit"
							sx={{ m: 1 }}
							onClick={handleApproveForm}
						>
							Speichern
						</Button>
					</DialogActions>
				</Dialog>}
		</>
	);
}

export default Form;

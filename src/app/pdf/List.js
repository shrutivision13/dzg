"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
	moment,
	Card,
	MenuItem,
	handleLoader,
	Select,
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	Controller,
	InputLabel,
	DialogActions,
	Button,
	useForm,
	CloseIcon,
	useDispatch,
	Toast,
	TextField,
	DeleteIcon,
	FileCopyIcon,
	DeleteForeverIcon
} from "../../helper/imports/Imports";
import { ApiPdfList, ApiApprove, ApiResendMail, ApiArchive, ApiRelease, ApiDeleteDraft } from "@/api-wrapper/ApiPdf";
import DownloadIcon from "@mui/icons-material/Download";
import "./pdf.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreateIcon from "@mui/icons-material/Create";
import Permission from "@/helper/permission/permission";
import ArchiveIcon from "@mui/icons-material/Archive";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Form from "../form/Form";
import { ApiDeleteForm } from "@/api-wrapper/ApiDeleteList";
import { CommonConfirmationModal, ModalWithInputField } from "./CommonModels";
function List() {
	let dispatch = useDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();
	const [tableData, setTableData] = useState([]);
	const [currentPage, setcurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalRecords, setTotalRecords] = useState(0);
	const [confirmationFlag, setConfirmationFlag] = useState(false);
	const [approveDetails, setApproveDetails] = useState();
	const [mailModalShow, setMailModalShow] = useState(false);
	const [messageModalShow, setMessageModalShow] = useState(false);
	const [selectedRow, setSelectedRow] = useState();
	const [search, setSearch] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isDeleteDraftModalOpen, setIsDeleteDraftModalOpen] = useState(false);
	const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
	const [filterValue, setFilterValue] = useState('')
	const [currentFieldName, setCurrentfieldName ] = useState("customer.date")
	const [curremtSortType, setCurremtSortType ] = useState(-1)


	let columns = [
		{
			name: "",
			cell: (row) => (
				<>
					<div
						className={
							row?.requestForChanges
								? "red_flag"
								: row.isReviewerApproved == false &&
									row.isWriterApproved == false
									? "yellow_flag"
									: "green_flag"
						}
					></div>
				</>
			),

		},
		{
			name: "Auftrag Nr.",
			selector: (row) => row.apOrderNumber,
			cell: (row) => <>{row?.customer?.orderConfirmationAndPosition ? row?.customer?.orderConfirmationAndPosition : "-"}</>,
			sortable: true,
			label: "customer.orderConfirmationAndPosition"
		},
		{
			name: "Erstellt von",
			selector: (row) => row.customer.createdBy,
			cell: (row) => <>{row?.customer && row?.customer.createdBy}</>,
			sortable: true,
			label: "customer.createdBy"
		},
		{
			name: "Vertriebsgebiet",
			selector: (row) => row?.customer?.salesArea,
			sortable: true,
			label: "customer?.salesArea"
		},
		{
			name: "Erstellung Datum",
			selector: (row) => row.customer.date,
			cell: (row) => <>{row?.customer && row.customer?.date}</>,
			sortable: true,
			label: "customer.date"
		},
		{
			name: "Kunde",
			selector: (row) => row.customer.customerName,
			cell: (row) => <>{row?.customer && row.customer.customerName}</>,
			sortable: true,
			label: "customer.customerName"
		},
		{
			name: "Typ",
			selector: (row) => row.configuration.type,
			cell: (row) => <>{row?.customer && row.configuration.type}</>,
			sortable: true,
			label: "configuration.type"
		},
		{
			name: "Anzahl",
			selector: (row) => row.configuration.number,
			cell: (row) => <>{row?.customer && row.configuration.number}</>,
			sortable: true,
			label: "configuration.number"
		},

		{
			name: "send Mail",
			cell: (row) =>
				row.isDraft ? null : row?.isApproved == false ? (
					<Button
						variant="contained"
						className="mail_icon"
						onClick={() => {
							setMailModalShow(true);
							setSelectedRow(row);
						}}
						endIcon={<MailOutlineIcon />}
					></Button>
				) : (
					"-"
				),
		},

		{
			name: "status",
			width: "200px",
			cell: (row) => (
				<div>
					{
						row.isApproved && row.isRelease ? (
							<div className={"released"}>Freigabe</div>
						)
							:
							row.isDraft ?
								<div className="request_change">Draft</div>
								:
								row?.requestForChanges ? (
									<div className="request_change">Request For Changes</div>
								) :

									row.isApproved ? (
										<div className={"approve"}>Bestätigt </div>
									)
										:
										<div className={row.isReviewerApproved == true ? "approve" : "not_approve"}>
											{row.isReviewerApproved == true ? "Client Approved" : "In Bearbeitung"}
										</div>
					}

				</div>
			),
		},

		{
			name: "action",
			selector: (row) => row,
			width: "250px",
			cell: (row) => (
				<div className="action_icon">
					{(row?.isApproved && !row.isRelease) ?
						(
							<Tooltip title="Freigabe Formular">
								<span onClick={() => { setSelectedRow(row); setIsReleaseModalOpen(true) }}>
									<AdminPanelSettingsIcon className="download_icon" />
								</span>
							</Tooltip>

						)
						: null}

					{row?.isApproved ? <>
						{!row.isRelease &&
							<Link
								href={{
									pathname: `/viewer/${row._id}`,
								}}
								onClick={(e) => {
									localStorage.setItem("isWriter", true);
									localStorage.removeItem('draftData')
								}}
							>
								<CreateIcon className={`download_icon`} />
							</Link>
						}
					</> :
						row.isDraft ?
							<Link
								href={{
									pathname: `/form`,
								}}
								onClick={(e) => {
									localStorage.setItem("isWriter", true);
									localStorage.setItem('draftData', JSON.stringify(row))
									setIsFormOpen(true);
								}}
							>
								<CreateIcon className={`download_icon`} />
							</Link>
							:

							<Link
								href={{
									pathname: `/viewer/${row._id}`,
								}}
								onClick={(e) => {
									localStorage.setItem("isWriter", true);
									localStorage.removeItem('draftData')
								}}
							>
								<CreateIcon className={`download_icon`} />
							</Link>
					}

					<Link href={{
						pathname: `/viewer/${row._id}`,
					}} onClick={(e) => {
						if ((Permission()?.role === 'User') || Permission()?.role === 'Admin') {
							localStorage.setItem("isWriter", true);
							localStorage.setItem("isWriterView", true);
							localStorage.removeItem('draftData')

						} else {
							e.preventDefault()
						}
					}} className="enabled-link">
						<RemoveRedEyeIcon className={`view_icon ${(Permission()?.role === 'User') || Permission()?.role === 'Admin' ? "allowed" : "not-allowed"}`} />
					</Link>

					{
						row.isRelease ?
							<>
								<Tooltip title="PDF-Datei herunterladen">
									<a
										href={window.location.origin + row.path}
										download
										target="_blank"
										rel="noreferrer"
										onClick={(e) => {
											if ((Permission()?.role === 'User') || Permission()?.role === 'Admin') {
												localStorage.removeItem('draftData')
											} else {
												e.preventDefault()
											}
										}}
									>
										{" "}
										<DownloadIcon className={`download_icon ${(Permission()?.role === 'User') || Permission()?.role === 'Admin' ? "allowed" : "not-allowed"}`} />
									</a>
								</Tooltip>
								<Tooltip title="Archivformular">
									<a onClick={() => {
										if ((Permission()?.role === 'User' && row.isRelease) || Permission()?.role === 'Admin') {
											handleArchive(row); localStorage.removeItem('draftData')
										} else {
											e.preventDefault()
										}
									}}
										target="_blank"
										rel="noreferrer">
										{" "}
										<ArchiveIcon className={`mail_icon ${(Permission()?.role === 'User' && row.isRelease) || Permission()?.role === 'Admin' ? "allowed" : "not-allowed"}`} />
									</a>
								</Tooltip>
							</> : ''
					}

					{row?.isApproved ? (
						<>
						</>
					) : (
						row.isDraft ? null :
							<Tooltip title="Genehmigen Sie dieses Formular">
								<div
									className="approve_btn"
									onClick={() => {
										approveHandler();
										setApproveDetails(row);
									}}	><DoneIcon />
								</div>
							</Tooltip>
					)}
					{
						row.isDraft ?
							<Tooltip title="Löschen Sie diesen Entwurf">
								<div
									className=""
									onClick={() => {
										setIsDeleteDraftModalOpen(true)
										setSelectedRow(row)
									}}><DeleteIcon className="view_icon" />
								</div>
							</Tooltip> : null
					}
					{
						row?.isApproved && row.isRelease && Permission()?.role === 'Admin' ?
							<Tooltip title="Formular löschen">
								<div
									className=""
									onClick={() => {
										setMessageModalShow(true);
										setSelectedRow(row);
									}}><DeleteForeverIcon className="view_icon" />
								</div>
							</Tooltip> : ""
					}
				</div>
			),
		},
	];

	const handleDeleteForm = (formdata) => {
		dispatch(handleLoader(true));
		let data = {
			id: selectedRow._id,
			message: formdata.message
		}
		ApiDeleteForm(data)
			.then((res) => {
				if (res.success) {
					handleList()
					dispatch(handleLoader(false));
					Toast.success(res.message);
					setSelectedRow('');
					setMessageModalShow(false);
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
					setSelectedRow('');
					setMessageModalShow(false);
				}
			}).catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went to wrong!!");
				setSelectedRow('');
				setMessageModalShow(false);
			});
	}
	const handleRelease = () => {
		dispatch(handleLoader(true));
		let data = {
			formId: selectedRow._id,
			isRelease: true
		}
		ApiRelease(data)
			.then((res) => {
				if (res.success) {
					handleList()
					dispatch(handleLoader(false));
					setSelectedRow('');
					setIsReleaseModalOpen(false);
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
					setSelectedRow('');
				}
			}).catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went to wrong!!");
				setSelectedRow('');
				setIsReleaseModalOpen(false);
			});
	}

	const handleCloseReleaseModal = () => setIsReleaseModalOpen(false);

	const handleArchive = row => {
		dispatch(handleLoader(true));
		let data = {
			formId: row._id,
			isArchived: true
		}

		ApiArchive(data)
			.then((res) => {
				if (res.success) {
					Toast.success(res.message)
					handleList()
					dispatch(handleLoader(false));
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
				}
			}).catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went to wrong!!");
			});
	}

	const handleList = (page, perPage, selectedValue) => {
		let data = {
			pageNo: page || 1,
			perPage: perPage || rowsPerPage,
			search: search,
			fieldName: currentFieldName,
			sortType: curremtSortType
		};
		if (selectedValue) {
			data.statusFilter = {
				[selectedValue]: selectedValue === "isArchived" ? false : true,
			};
		} else {
			if (filterValue !== "") {
				data.statusFilter = {
					[filterValue]: filterValue === "isArchived" ? false : true,
				};

			}
		}

		dispatch(handleLoader(true));
		ApiPdfList(data)
			.then((res) => {
				if (res.success) {
					
					setTableData(res.data);
					setcurrentPage(res.currentPageNo);
					setTotalRecords(res.totalRecords);
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
	};

	useEffect(() => {
		handleList();
		localStorage.removeItem("isCopy")
		localStorage.removeItem("isWriter")
	}, []);

	const approveHandler = () => {
		setConfirmationFlag(true);
	};

	const onClose = () => {
		reset();
		setConfirmationFlag(false);
	};
	const onSubmit = (data) => {
		dispatch(handleLoader(true));
		let sendData = {
			formId: approveDetails._id,
			approvedBy: data.role,
			requestForChanges: false,
			isWriterApproved: true,
			date: moment(new Date()).format("DD-MM-YYYY h:mm:ss a"),
			formNameId: approveDetails.formNameId,
			isApproved: true,
		};
		dispatch(handleLoader(true));
		ApiApprove(sendData)
			.then((res) => {
				if (res.success) {
					reset();
					handleList();
					dispatch(handleLoader(false));
					setConfirmationFlag(false);
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				dispatch(handleLoader(false));
				setConfirmationFlag(false);
				Toast.error("something went to wrong!!");
			});
	};

	const handleCloseDraftModal = () => setIsDeleteDraftModalOpen(false);

	const deleteDraft = () => {
		dispatch(handleLoader(true));
		ApiDeleteDraft(selectedRow._id)
			.then((res) => {
				if (res.success) {
					handleList();
					dispatch(handleLoader(false));
					setIsDeleteDraftModalOpen(false);
					setSelectedRow("");
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
					setSelectedRow("");
				}
			})
			.catch((err) => {
				dispatch(handleLoader(false));
				setIsDeleteDraftModalOpen(false)
				Toast.error("something went to wrong!!");
				setSelectedRow("");
			});
	}

	const onsubmitEmail = (data) => {
		let sendItem = {
			formId: selectedRow?._id,
			email: data.email,
		};
		dispatch(handleLoader(true));
		ApiResendMail(sendItem)
			.then((res) => {
				if (res.success) {
					Toast.success(res.message);
					dispatch(handleLoader(false));
					setSelectedRow("");
					setMailModalShow(false);
				} else {
					dispatch(handleLoader(false));
					setSelectedRow("");
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				setSelectedRow("");
				dispatch(handleLoader(false));
				setMailModalShow(false);
				Toast.error("something went to wrong!!");
			});
	};
	useEffect(() => {
		if (selectedRow) {
			if (selectedRow.email) {
				setValue("email", selectedRow.email);
			} else {
				setValue("email", selectedRow?.customer?.email);
			}
		}
	}, [selectedRow]);

	const handleSort = (column, sortDirection) => {
		let data = {
			pageNo: currentPage,
			perPage: rowsPerPage,
			search: search,
			fieldName: column.label,
			sortType: sortDirection === "asc" ? 1 : -1 
		};
		dispatch(handleLoader(true));
		ApiPdfList(data)
			.then((res) => {
				if (res.success) {
					setTableData(res.data);
					setCurremtSortType(sortDirection === "asc" ? 1 : -1 )
					setCurrentfieldName(column.label)
					dispatch(handleLoader(false));
				} else {
					Toast.error(res.message);
					dispatch(handleLoader(false));
				}
			})
			.catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went to wrong!!");
			});
	};
	
	return (
		<>
			<Card className="table_card_style">
				<div className="table_title ">
					<div className="outer_search">
						<h4>Form List</h4>
					</div>
				</div>
				<div className="search_section_Form_list align-items-center">
					<div className="search_container">
						<input
							type="search"
							placeholder="Search Here..."
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button onClick={() => handleList()}>Go</button>
					</div>
					<div className="filter_container">
						<p>Filter By Status</p>
						<Controller
							name="filterValue"
							control={control}
							render={({ field }) => (
								<Select
									fullWidth
									className="user_select"
									input={<OutlinedInput />}
									value={filterValue}
									style={{ width: '50%' }}
									{...field}
									onChange={(event) => {
										field.onChange(event.target.value);
										setFilterValue(event.target.value);
										handleList(currentPage, rowsPerPage, event.target.value)
									}}
								>
									<MenuItem value="isArchived">Alle </MenuItem>
									<MenuItem value="isApproved">Bestätigt </MenuItem>
									<MenuItem value="isDraft">Draft </MenuItem>
									<MenuItem value="isRelease">Freigabe </MenuItem>
									<MenuItem value="isInProgress">In Bearbeitung </MenuItem>
								</Select>
							)}
						/>
					</div>
				</div>
				<DataTable
					className="table_content pdf_list"
					columns={columns}
					striped={true}
					data={tableData}
					pagination
					paginationServer
					paginationPerPage={rowsPerPage}
					onChangeRowsPerPage={(event) => {
						setRowsPerPage(parseInt(event));
						handleList(currentPage, event);
					}}
					onChangePage={(page) => {
						handleList(page);
					}}
					paginationDefaultPage={currentPage}
					paginationTotalRows={totalRecords}
					onSort={handleSort}
					fixedHeader
				/>
			</Card>

			<Dialog
				open={confirmationFlag}
				onClose={() => onClose()}
				fullWidth
				className="modal_form"
			>
				<DialogTitle sx={{ m: 0, p: 2 }}>
					Are you sure want to approve this form?
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={() => onClose()}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<InputLabel> Freigabe vom Kunden per Mail / per Telefon</InputLabel>
						<Controller
							name="role"
							control={control}
							rules={{ required: "field is required" }}
							render={({ field }) => (
								<>
									<Select
										fullWidth
										className="user_select"
										input={<OutlinedInput />}
										value={field.value}
										{...field}
										onChange={(event) => {
											field.onChange(event.target.value);
										}}
										error={!!errors.role}
										helperText={errors.role && errors.role.message}
									>
										<MenuItem value="Email">Email </MenuItem>
										<MenuItem value="Phone">Phone </MenuItem>
									</Select>
									{errors.role && errors.role && (
										<p className="error">{errors.role.message}</p>
									)}
								</>
							)}
						/>
						{/* <InputLabel>Ap+ Auftragsnummer</InputLabel>
						<Controller
							name={`apOrderNumber`}
							control={control}
							render={({ field }) => (
								<TextField
									type={"text"}
									fullWidth
									value={field.value}
									{...field}
									onChange={(e) => {
										field.onChange(e.target.value);
									}}
								/>
							)}
						/> */}
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={() => onClose()} color="error">
							Close
						</Button>
						<Button variant="contained" color="success" type="submit">
							Speichern
						</Button>
					</DialogActions>
				</form>
			</Dialog>

			{/* mail modal */}

			<ModalWithInputField
				open={mailModalShow}
				onClose={() => setMailModalShow(false)}
				title="Are you sure you want to send this mail?"
				onSubmit={onsubmitEmail}
				inputLabel="Email"
				inputName="email"
			/>

			{/* cancel from modal */}
			<ModalWithInputField
				open={messageModalShow}
				onClose={() => setMessageModalShow(false)}
				title="Please provide the reason for cancelling this form"
				onSubmit={handleDeleteForm}
				inputLabel="Message"
				inputName="message"
			/>

			<CommonConfirmationModal
				isModalOpen={isReleaseModalOpen}
				handleClose={handleCloseReleaseModal}
				handleSave={handleRelease}
				modalTitle="Are you sure want to release this form?" />

			<CommonConfirmationModal
				isModalOpen={isDeleteDraftModalOpen}
				handleClose={handleCloseDraftModal}
				handleSave={deleteDraft}
				modalTitle="Are you sure want to delete this draft?" />
			{
				isFormOpen &&
				<Form />
			}
		</>
	);
}
export default List;

"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "./Add";
import { ApiDelete, ApiList } from "@/api-wrapper/ApiUser";
import DeleteModal from "../../helper/delete/DeleteModal";
import {
	Card,
	Button,
	useDispatch,
	handleLoader,
	Toast,
} from "../../helper/imports/Imports";
import MailLockIcon from "@mui/icons-material/MailLock";
import Tooltip from "@mui/material/Tooltip";
import { ApiResetPassword } from "@/api-wrapper/ApiPdf";
function List() {
	const [show, setShow] = useState(false);
	let dispatch = useDispatch();
	const [tableData, settableData] = useState([]);
	const [currentPage, setcurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalRecords, setTotalRecords] = useState(0);
	const [deleteId, setDeleteId] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [editData, setEditData] = useState();

	let columns = [
		{
			name: "name",
			selector: (row) => row.name,
			sortable: true,
			label: "name"
		},
		{
			name: "email",
			selector: (row) => row.email,
			sortable: true,
			style: {
				textTransform: "none"
			},
			label: "email"
		},

		{
			name: "Vertriebsgebiet",
			selector: (row) => row.salesArea,
			sortable: true,
			cell: (e) => {
				return e?.salesArea?.join(",");
			},
		},
		{
			name: "User Typ",
			selector: (row) => row.role,
			sortable: true,
			cell: (e) => {
				return e?.role == "User" ? "Außendienst" : "Administrator"
			},
			label: "role"
		},
		{
			name: "action",
			width: "150px",
			selector: (row) => row.phoneNumber,
			cell: (row) => (
				<div className="action_icon user_action_icon">
					<Tooltip title="Bearbeiten">
						<ModeEditIcon
							className="edit_icon"
							onClick={() => {
								setEditData(row);
								setShow(true);
							}}
						/>
					</Tooltip>

					<Tooltip title="Löschen">
						<DeleteIcon
							className="delete_icon"
							onClick={() => {
								setShowDeleteModal(true);
								setDeleteId(row._id);
							}}
						/>
					</Tooltip>

					<Tooltip title="Passwort zurücksetzen">
						<MailLockIcon className="mail_icon" onClick={() => resetPwdHandler(row)} />
					</Tooltip>
				</div>
			),
		},
	];

	const handleList = (page, perPage) => {
		dispatch(handleLoader(true));
		let data = {
			pageNo: page || 1,
			perPage: perPage || rowsPerPage,
		};

		ApiList(data)
			.then((res) => {
				if (res.success) {
					settableData(res.data);
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
	}, []);

	const deleteHandler = () => {
		dispatch(handleLoader(true));
		ApiDelete(deleteId)
			.then((res) => {
				if (res.success) {
					Toast.success(res.message);
					handleList();
					dispatch(handleLoader(false));
				} else {
					Toast.error(res.message);
					dispatch(handleLoader(false));
				}
				setDeleteId();
			})
			.catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("Something went wrong, please try again!");
			});
	};

	const resetPwdHandler = (row) => {

		dispatch(handleLoader(true));
		let data = {
			email: row.email
		};

		ApiResetPassword(data)
			.then((res) => {
				if (res.success) {
					Toast.success(res.message);
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
	return (
		<>
			<Card className="table_card_style">
				<div className="table_title">
					<h4>Users</h4>
					<Button
						onClick={() => {
							setShow(true);
							setEditData();
						}}
						className="blue_color"
						variant="contained"
						startIcon={<AddIcon />}
					>
						Add User
					</Button>
				</div>

				<DataTable
					className="table_content"
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
					fixedHeader
				/>
			</Card>
			<Add
				show={show}
				setShow={setShow}
				editData={editData}
				setEditData={setEditData}
				handleList={handleList}
			/>

			<DeleteModal
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				deleteHandler={deleteHandler}
			/>
		</>
	);
}

export default List;

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
	FileCopyIcon,
} from "../../helper/imports/Imports";
import { ApiGET } from "@/api-wrapper/ApiArchive";
import Link from "next/link";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import './archiveList.css';
function ArchiveList() {
	let dispatch = useDispatch();
	const [tableData, setTableData] = useState([]);
	const [currentPage, setcurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalRecords, setTotalRecords] = useState(0);
	const [search, setSearch] = useState("");
	const [currentFieldName, setCurrentfieldName] = useState("customer.date")
	const [curremtSortType, setCurremtSortType] = useState(-1)


	let columns = [
		{
			name: "",
			cell: (row) => (
				<>
					<div
						className={
							row?.isCancelled
								? "red_flag" : 'green_flag'
						}
					></div>
				</>
			),
		},

		{
			name: "AP+Auftragnummer",
			selector: (row) => row?.customer?.orderConfirmationAndPosition,
			cell: (row) => <>{row.customer?.orderConfirmationAndPosition ? row.orderConfirmationAndPosition : "-"}</>,
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
			label: "customer.salesArea"
		},
		{
			name: "Erstellung Datum",
			selector: (row) => row.customer.date,
			cell: (row) => <>{row.customer.date}</>,
			sortable: true,
			label: "customer.date"
		},
		{
			name: "Kunde",
			selector: (row) => row.customer.customerName,
			cell: (row) => <>{row.customer.customerName}</>,
			sortable: true,
			label: "customer.customerName"
		},
		{
			name: "Typ",
			selector: (row) => row.configuration.type,
			cell: (row) => <>{row.configuration.type}</>,
			sortable: true,
			label: "configuration.type"
		},
		{
			name: "Anzahl",
			selector: (row) => row.configuration.number,
			cell: (row) => <>{row.configuration.number}</>,
			sortable: true,
			label: "configuration.number"
		},
		{
			name: "typ",
			selector: (row) => row.configuration.number,
			cell: (row) => <>
				<div>
					{
						row.isCancelled ? (
							<div className="cancelled">Storno</div>
						) :
							<div className={"approve"}>Archiv</div>
					}

				</div></>,
			sortable: true,
			label: "configuration.number"
		},
		{
			name: "action",
			selector: (row) => row,
			cell: (row) => (
				<div className="action_icon">
					{
						row.isArchived &&
						<Link
							href={{
								pathname: `/viewer/${row._id}`,
							}}
							onClick={() => {
								localStorage.setItem("isWriter", true);
								localStorage.setItem("isWriterView", true);
							}}
						>
							<RemoveRedEyeIcon className="view_icon" />
						</Link>

					}

					{row?.isApproved && row.isArchived ? (
						<>
							<Tooltip title="PDF-Datei herunterladen">
								<Link
									href={window.location.origin + row.path}
									download
									target="_blank"
									rel="noreferrer"
								>
									<DownloadIcon className="download_icon" />
								</Link>
							</Tooltip>

						</>
					) : null}
					{
						<Link
							href={{
								pathname: `/viewer/${row._id}`,
							}}>
							<div
								className=""
								onClick={() => { localStorage.setItem("isCopy", true); localStorage.setItem("isWriter", true) }}><FileCopyIcon className="clone_icon" />
							</div>
						</Link>

					}
				</div>
			),
		},
	];

	const handleList = (page, perPage) => {
		let data = {
			pageNo: page || 1,
			perPage: perPage || rowsPerPage,
			search: search,
			fieldName: currentFieldName,
			sortType: curremtSortType
		};
		dispatch(handleLoader(true));
		ApiGET(data)
			.then((res) => {
				if (res.success) {
					setTableData(res.getForm);
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
		localStorage.removeItem("isCopy");
		localStorage.removeItem("isWriter");
	}, []);

	const handleSort = (column, sortDirection) => {
		let data = {
			pageNo: currentPage,
			perPage: rowsPerPage,
			search: search,
			fieldName: column.label,
			sortType: sortDirection === "asc" ? 1 : -1
		};
		dispatch(handleLoader(true));
		ApiGET(data)
			.then((res) => {
				if (res.success) {
					setTableData(res.getForm);
					setCurremtSortType(sortDirection === "asc" ? 1 : -1)
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
				<div className="table_title">
					<h4>Archive List</h4>
				</div>
				<div className="search_section">
					<input
						type="search"
						placeholder="Search Here..."
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button onClick={() => handleList()}>Go</button>
				</div>
				<DataTable
					className="table_content "
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
		</>
	);
}

export default ArchiveList;

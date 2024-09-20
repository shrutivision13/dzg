import React, { useEffect } from "react";
import {
	MenuItem,
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
	TextField,
	useDispatch,
	handleLoader,
	Toast,
} from "../../helper/imports/Imports";
import { ApiCreate, ApiUpdate } from "@/api-wrapper/ApiUser";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ApiFormList } from "@/api-wrapper/ApiForm";
import { ApiChangePwd } from "@/api-wrapper/ApiPwd";

function ChangePwd({ pwdModalShow, setPwdModalShow }) {
	const {
		watch,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();
	let dispatch = useDispatch();

	const handleClose = () => {
		setPwdModalShow(false);
		reset();
	};

	const onSave = (data) => {

		ApiChangePwd(data)
			.then((res) => {
				if (res.success) {
					Toast.success(res.message);
					dispatch(handleLoader(false));
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
				}
			}).catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went to wrong!!");
			});
	};

	return (
		<Dialog
			open={pwdModalShow}
			onClose={() => handleClose()}
			fullWidth
			className="modal_form"
		>
			<DialogTitle sx={{ m: 0, p: 2 }} className="dialog_title">
				Change Password
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={() => handleClose()}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<form onSubmit={handleSubmit(onSave)} className="form">
				<DialogContent>
					<InputLabel>Current Password</InputLabel>
					<Controller
						name="currentPassword"
						control={control}
						rules={{ required: "Current Password is required" }}
						render={({ field }) => (
							<TextField
								type="text"
								fullWidth
								{...field}
								error={!!errors.currentPassword}
								helperText={
									errors.currentPassword && errors.currentPassword.message
								}
							/>
						)}
					/>
					<InputLabel>New Password</InputLabel>
					<Controller
						name="newPassword"
						control={control}
						rules={{ required: "New Password is required" }}
						render={({ field }) => (
							<TextField
								type="password"
								fullWidth
								{...field}
								error={!!errors.newPassword}
								helperText={errors.newPassword && errors.newPassword.message}
							/>
						)}
					/>
					<InputLabel>Confirm Password</InputLabel>
					<Controller
						name="confirmPassword"
						control={control}
						rules={{ required: "Confirm Password is required" }}
						render={({ field }) => (
							<TextField
								type="password"
								fullWidth
								{...field}
								error={!!errors.confirmPassword}
								helperText={
									errors.confirmPassword && errors.confirmPassword.message
								}
							/>
						)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={() => handleClose()}
						color="error"
					>
						Close
					</Button>
					<Button variant="contained" color="success" type="submit">
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default ChangePwd;

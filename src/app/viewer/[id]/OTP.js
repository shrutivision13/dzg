"use client"
import React, { useEffect, useState } from 'react'
import Form from '../../form/Form';
import { useParams } from 'next/navigation'
import { Box, handleLoader, Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Button, CloseIcon, useDispatch, Toast, Grid } from '../../../helper/imports/Imports';
import { ApiGenerateOTP, ApiVerifyOTP } from '@/api-wrapper/ApiViewer';
import OtpInput from "react-otp-input";
import '../viewer.css';
import cookies from "js-cookie"
import { useRouter } from 'next/navigation'
function OTP() {
	const params = useParams()
	let dispatch = useDispatch()
	const [otp, setOtp] = useState('');
	const [otpcode, setOTPcode] = useState(false);
	const [otpFlag, setOTPflag] = useState(true);
	const [isFormShow, setIsFormShow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [msg, setMsg] = useState('');
	useEffect(() => {
		if (cookies.get('isForm')) {
			setIsFormShow(cookies.get('isForm'))
		}
	}, [cookies.get('isForm')]);

	useEffect(() => {
		if (localStorage.getItem("isWriter") || localStorage.getItem("isCopy")) {
			setIsFormShow(true)
		}

	}, [typeof window !== 'undefined' && (localStorage.getItem("isWriter") || localStorage.getItem("isCopy"))]);

	const handleClose = () => {
		if (!otpcode) {
			setOTPflag(true)
		}
	}

	const handleOTPgenerate = () => {

		if (params.id) {
			dispatch(handleLoader(true))
			let data = {
				formId: params.id
			}
			ApiGenerateOTP(data)
				.then((res) => {
					if (res.success) {
						Toast.success(res.message)
						setOTPcode(true)
						dispatch(handleLoader(false))
					}
					else {
						dispatch(handleLoader(false))
						Toast.error(res.message)
					}
				}).catch((err) => {
					dispatch(handleLoader(false))
					Toast.error("something went to wrong!!")
				});

		}
	}

	const handleOTPverify = () => {
		dispatch(handleLoader(true))
		let data = {
			formId: params.id,
			otpCode: otp
		}
		ApiVerifyOTP(data)
			.then((res) => {
				if (res.success) {
					cookies.set('isForm', true)
					Toast.success(res.message)
					setOTPcode(false)
					setOTPflag(false)
					setIsFormShow(true)
					dispatch(handleLoader(false))
				}
				else {
					dispatch(handleLoader(false))
					Toast.error(res.message)
				}
			}).catch((err) => {
				dispatch(handleLoader(false))
				Toast.error("something went to wrong!!")
			});

	}


	useEffect(() => {

		const handleBeforeUnload = () => {
			cookies.remove('isForm');
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};

	}, []);

	return (
		<>

			{
				isOpen ?
					<div className="not_found">
						<h2>{msg}</h2>
					</div>
					:
					isFormShow ?
						<div className='otp_form'>
							<Form param={params.id} />
						</div>
						:
						<Dialog open={otpFlag} onClose={() => handleClose()} fullWidth className='modal_form'>

							<DialogTitle sx={{ m: 0, p: 2 }} >

								{
									otpcode ? "Verification Code" : "OTP"
								}
							</DialogTitle>
							<IconButton
								aria-label="close"
								onClick={() => handleClose()}
								sx={{
									position: 'absolute',
									right: 8,
									top: 8,
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>

							<DialogContent  >
								{
									otpcode ?
										<Box className="verification">
											<h4>Please enter the verification code sent to your mobile</h4>
											<Grid item spacing={3} className='verification_grid'>
												<OtpInput
													inputStyle={{
														width: "3rem",
														height: "3rem",
														margin: "0 1rem",
														fontSize: "2rem",
														border: "1px solid rgba(0,0,0,0.3)"
													}}
													value={otp}
													onChange={setOtp}
													numInputs={6}
													renderSeparator={<span>-</span>}
													renderInput={(props) => <input {...props} />}
												/>
											</Grid>
										</Box>
										:
										<h4>
											Bitte senden Sie mir einen Bestätigungs-Code !!
										</h4>

								}
							</DialogContent>
							<DialogActions>
								{
									otpcode ?
										<Button variant="contained" color="primary" onClick={() => handleOTPverify()}>
											verify
										</Button>
										:
										<Button variant="contained" color="primary" onClick={() => handleOTPgenerate()}>
											Senden
										</Button>
								}
							</DialogActions>
						</Dialog>

			}

		</>
	)
}

export default OTP
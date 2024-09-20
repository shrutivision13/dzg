"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import "./Header.css";
import Drawer from "@mui/material/Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { handleLoader, sidebarHandler } from "@/redux/action";
import { useRouter } from "next/navigation";
import { ApiLogout } from "@/api-wrapper/ApiLogin";
import Toast from "@/helper/toast/Toast";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import Tooltip from "@mui/material/Tooltip";
import ChangePwd from "./ChangePwd";
import { useState } from "react";
const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

function Header() {
	let router = useRouter();
	const open = useSelector((state) => state.data.open);
	let dispatch = useDispatch();

	const [isClient, setIsClient] = React.useState(false);
	const [pwdModalShow, setPwdModalShow] = useState(false);
	React.useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const logoutHandler = () => {
		dispatch(handleLoader(true));
		ApiLogout()
			.then((res) => {
				if (res.success) {
					router.push("/login");
					Toast.success(res.message);
					localStorage.removeItem("login_details");
					localStorage.clear();
					dispatch(handleLoader(false));
				} else {
					dispatch(handleLoader(false));
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				dispatch(handleLoader(false));
				Toast.error("something went wrong !!");
			});
	};

	return (
		<>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => dispatch(sidebarHandler(!open))}
						edge="start"
					>
						<MenuIcon className="header_menu_icon" />
					</IconButton>

					<Box flexGrow={1} />

					<Tooltip title="Change Password">
						<Box className="header_icon change_password">
							<EnhancedEncryptionIcon
								className="inner_icon"
								onClick={() => setPwdModalShow(true)}
							/>
						</Box>
					</Tooltip>

					<Tooltip title="Logout">
						<Box className="header_icon">
							<LogoutIcon
								className="inner_icon"
								onClick={() => logoutHandler()}
							/>
						</Box>
					</Tooltip>
				</Toolbar>
			</AppBar>

			<ChangePwd
				pwdModalShow={pwdModalShow}
				setPwdModalShow={setPwdModalShow}
			/>
		</>
	);
}

export default Header;

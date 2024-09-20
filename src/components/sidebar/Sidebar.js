"use client"
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import "./sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { sidebarHandler } from '../../redux/action';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { route } from '../../helper/route/router';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Permission from '@/helper/permission/permission';
import Logo from '../../assets/images/Logo.png';
import Image from 'next/image';
const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'space-evenly',
}));



function Sidebar({ }) {
	let router = useRouter()
	let pathname = usePathname()
	const theme = useTheme();
	const open = useSelector(state => state.data.open)
	let dispatch = useDispatch();
	const [nav, setNav] = React.useState([]);

	React.useEffect(() => {
		if (Permission()?.role !== "Admin") {
			setNav(route.filter(x => x.name !== "Benutzer"  ));
		} else {
			setNav(route);
		}
	}, [route]);


	return (
		<div className='sidebar_container'>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				open={open}
			>
				<DrawerHeader className='sidebar_drawer'>
					<Image src={Logo} alt='logo' className="logo" />
					<p className='sidebar_logo_name'>DZG SML APP</p>
					{/* <IconButton className='sidebar_main_icon' onClick={() => dispatch(sidebarHandler(false))}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton> */}
				</DrawerHeader>
				<Divider />
				<ul className={`sidebar_details`}>
					{nav.map((sub, index) => {
						return (
							<li className={pathname === sub.path ? "sidebar_active" : ""} key={index}>
								<Link href={sub.path} key={index} className='sidebar_link'>
									{sub.icon}
									<span> {sub.name}</span>
								</Link>
							</li>
						);
					})}
				</ul>
				{/* <List className='sidebar_list'>
                    {
                        route?.map((el, index) => {
                            return (
                                <Link href={el.path} key={index} className='sidebar_link'>
                                    <ListItem disablePadding className={pathname === el.path ? "sidebar_active" : ""}>
                                        <ListItemButton >

                                            <ListItemIcon>
                                                {el.icon}
                                            </ListItemIcon>
                                            <ListItemText className='child_name'>{el.name}</ListItemText>

                                        </ListItemButton>
                                    </ListItem>
                                </Link>

                            )
                        })
                    }

                </List> */}

			</Drawer>

		</div>
	)
}

export default Sidebar
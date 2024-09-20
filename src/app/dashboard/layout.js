"use client"
import React from 'react';
import View from '../../components/View';
import '../../style/layout.css';

import { Box, DrawerHeader, Main, useSelector } from '../../helper/imports/Imports';


function Layout({ children }) {

    const open = useSelector(state => state.data.open)

    return (
        <Box sx={{ display: 'flex' }}>
            <View />
            <Main open={open} className='layuout_middle_container dashboard_container'>
                <DrawerHeader className="layuout_drawer" />
                {children}

            </Main>
        </Box>
    );
}

export default Layout;

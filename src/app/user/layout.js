"use client"
import React from 'react';
import View from '../../components/View';
import { useSelector } from 'react-redux'
import { Box } from '@mui/material';
import '../../style/layout.css';
import { Main, DrawerHeader } from '../../helper/layoutStyle/LayoutStyle';
import Permission from '@/helper/permission/permission';

function Layout({ children }) {

    const open = useSelector(state => state.data.open)

    return (

        <Box sx={{ display: 'flex' }}>
            <View />
            <Main open={open} className='layuout_middle_container'>
                <DrawerHeader className="layuout_drawer" />
                {children}
            </Main>
        </Box>

    );
}

export default Layout;

"use client"
import React, { useLayoutEffect } from 'react';
import List from './List';
import Permission from '@/helper/permission/permission';
import { redirect } from 'next/navigation';

function page() {

    useLayoutEffect(() => {
        const isAuth = Permission()?.role !== "User";
        if (!isAuth) {
            redirect("/")
        }
    }, [])
    
    return (
        <List />
    )
}
export default page
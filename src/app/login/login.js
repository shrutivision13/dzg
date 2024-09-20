"use client"
import React from 'react'
import { TextField } from '@material-ui/core';
import './login.css';
import { ApiLogin } from '@/api-wrapper/ApiLogin';
import { useRouter } from "next/navigation";

import { handleLoader, Button, Grid, Toast, useForm, Controller, useDispatch } from '../../helper/imports/Imports';
function login() {
    let dispatch = useDispatch()

    let router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }



    const onSubmit = (data) => {
        dispatch(handleLoader(true))
        ApiLogin(data)
            .then((res) => {
                if (res.success) {
                    router.push('/dashboard')
                    localStorage.setItem("login_details", JSON.stringify(res.data))
                    Toast.success(res.message);
                    dispatch(handleLoader(false))
                } else {
                    dispatch(handleLoader(false))
                    Toast.error(res.message);

                }
            }).catch((err) => {
                dispatch(handleLoader(false))
                Toast.error("something went wrong!!");
            });

    };



    return (
        <div className='login_container'>
            <Grid
                className='login_grid'
            >
                <h3 className='login_title'>Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                label="Email"
                                fullWidth
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email && errors.email.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => (
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                {...field}
                                error={!!errors.password}
                                helperText={errors.password && errors.password.message}
                            />
                        )}
                    />
                    <div className='login_btn'>
                        <Button type="submit">Login</Button>
                    </div>
                </form>
            </Grid>
        </div>
    )
}

export default login
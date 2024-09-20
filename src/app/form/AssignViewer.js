"use client"
import React, { useEffect, useState } from 'react'
import {
    MenuItem, handleLoader, Select, Dialog, DialogTitle, IconButton, DialogContent, Controller,
    DialogActions, Button, useForm, CloseIcon, useDispatch, Toast, TextField, InputLabel
} from '../../helper/imports/Imports';
import { ApiSaveList, ApiViewerList } from '@/api-wrapper/ApiForm';


function AssignViewer({ submitData, resetHandler, selectedFormId, viewerShow, setViewerShow }) {
    const { reset, control, handleSubmit, formState: { errors } } = useForm();
    let dispatch = useDispatch();
    const [list, setList] = useState([]);

    const handleClose = () => {
        setViewerShow(false)
        reset()
    }

    useEffect(() => {
        if (viewerShow) {
            dispatch(handleLoader(true))
            let data = []
            ApiViewerList()
                .then((res) => {
                    if (res.success) {
                        res.data.map(el => {
                            data.push({
                                label: el.name,
                                value: el._id
                            })
                        })
                        setList(data)
                        dispatch(handleLoader(false))
                    }
                    else {
                        Toast.error(res.message)
                        dispatch(handleLoader(false))
                    }
                }).catch((err) => {
                    dispatch(handleLoader(false))
                    Toast.error("something went wrong!!")
                });
        }
    }, [viewerShow]);



    const onSubmit = (data) => {

        dispatch(handleLoader(true))
        let sendData = {
            formNameId: selectedFormId,
            email: data.email ? data.email : "",
            reviewerId: data.assignViewer,
            requestForChanges: false,
            isReviewerApproved: false,
            isWriterApproved: false,
            ...submitData
        }
       
        ApiSaveList(sendData)
            .then((res) => {
                if (res.success) {
                    Toast.success(res.message)
                    setViewerShow(false)
                    reset()
                    resetHandler()
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

    return (
        <React.Fragment>
            <Dialog open={viewerShow} onClose={() => handleClose()} fullWidth className='modal_form'>
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    Assign Viewer
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
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                    <DialogContent>
                        <InputLabel >Assign Viewer <span className='validation'> *</span></InputLabel>
                        <Controller
                            name="assignViewer"
                            control={control}
                            rules={{
                                required: "Please Assign the Viewer",
                            }}
                            render={({ field }) => (
                                <Select
                                    fullWidth
                                    className='user_select'
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    {...field}
                                    value={field.value}
                                    error={!!errors["assignViewer"]}
                                    helperText={errors["assignViewer"] && errors["assignViewer"].message}
                                >
                                    {list.map((option) => (
                                        <MenuItem key={option.value} value={option.value} >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors["assignViewer"] && (
                            <p className="error">{errors["assignViewer"].message}</p>
                        )}
                        <InputLabel >Email</InputLabel>
                        <Controller
                            name={`email`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    type={"text"}

                                    fullWidth
                                    value={field.value}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}

                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => handleClose()} color='error'>
                            Close
                        </Button>
                        <Button variant="contained" color="primary" type='submit'>
                            Assign
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}

export default AssignViewer
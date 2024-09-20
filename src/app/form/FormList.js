"use client"
import {
	Card, Select, MenuItem, Box, Toast, useEffect, handleLoader, useDispatch
} from '../../helper/imports/Imports';
import * as React from 'react';
import "./formlist.css";
import { ApiFormList } from '@/api-wrapper/ApiForm';
import { formData } from './FormData';
function FormList({ changeFormHandler, list, setList, otherData, param, setcurrentForm, reset, selectedForm, setSelectedForm, setSelectedFormId, selectedFormId }) {
	let dispatch = useDispatch()

	const HandleView = () => {
		dispatch(handleLoader(true))
		let data = []
		ApiFormList()
			.then((res) => {	
				if (res.success) {
					res.data.map(el => {
						data.push({
							label: el.formName,
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

	useEffect(() => {
		HandleView()
	}, []);


	const handleChange = (val) => {

		setcurrentForm([])
		reset()
		// const selectedValue = val;
		// setSelectedFormId(selectedValue)
		// const selectedOption = list.find(option => option.value === val);
		// setSelectedForm(selectedOption?.label)
	};


	useEffect(() => {
		if (selectedFormId) {
			const selectedOption = list.find(option => option.value === selectedFormId);
			setSelectedForm(selectedOption?.label)
			setcurrentForm(formData[selectedOption?.label])
		}
		else {
			setSelectedForm(list[0]?.label)
			setSelectedFormId(list[0]?.value)
			setcurrentForm(formData[list[0]?.label])
		}
	}, [list, selectedFormId]);


	return (
		<div className='form_container'>
			<Card className='table_card_style form_style form_list'>
				<Box>
					<p className='formlist_title'>Typ - <span style={{ color: "gray" }}>{selectedForm}</span></p>
				</Box>
				<Box>

					<Select
						onChange={(e) => { localStorage.removeItem('draftData'); changeFormHandler(e.target.value); setSelectedFormId(e.target.value); handleChange() }}
						value={selectedFormId}
						defaultValue={list[0]}
						disabled={param}
					>

						{list.map((option) => (
							<MenuItem key={option.value} value={option.value} >
								{option.label}
							</MenuItem>
						))}
					</Select>


				</Box>

			</Card>
		</div>
	)
}

export default FormList
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

function Add({ handleList, setEditData, editData, show, setShow }) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  let dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(handleLoader(true));
    if (editData == undefined) {
      let item = {
        email: data.email,
        name: data.name,
        salesArea: data.salesArea,
        role: data.role
      };
      ApiCreate(item)
        .then((res) => {
          if (res.success) {
            Toast.success(res.message);
            reset();
            setShow(false);
            handleList();
            dispatch(handleLoader(false));
          } else {
            dispatch(handleLoader(false));
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          dispatch(handleLoader(false));
          Toast.error("something went to wrong!!");
        });
    } else {
      let item = {
        email: data.email,
        name: data.name,
        salesArea: data.salesArea,
        role: data.role
      };

      ApiUpdate(editData?._id, item)
        .then((res) => {
          if (res.success) {
            Toast.success(res.message);
            reset();
            setShow(false);
            handleList();
            dispatch(handleLoader(false));
          } else {
            dispatch(handleLoader(false));
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          dispatch(handleLoader(false));
          Toast.error("something went to wrong!!");
        });
    }
  };

  const handleClose = () => {
    reset();
    setEditData();
    setShow(false);
  };

  useEffect(() => {
    if (editData != undefined) {
      reset(editData);
    } else {
      setValue("name", "");
      setValue("email", "");
      setValue("salesArea", []);
      setValue("role", "")
    }
  }, [editData, show]);


  return (
    <React.Fragment>
      <Dialog
        open={show}
        onClose={() => handleClose()}
        fullWidth
        className="modal_form"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} className="dialog_title">
          User
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
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <DialogContent>
            <InputLabel>name</InputLabel>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  type="name"
                  fullWidth
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
              )}
            />
            <InputLabel>Email</InputLabel>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  type="email"
                  fullWidth
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />

            <InputLabel>Vertriebsgebiet </InputLabel>
            <Controller
              name="salesArea"
              control={control}
              rules={{ required: "Vertriebsgebiet  is required" }}
              render={({ field }) => (
                <>
                  <Select
                    multiple
                    fullWidth
                    className="user_select"
                    input={<OutlinedInput />}
                    value={field.value || []}
                    {...field}
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      if (selectedValue.includes("all")) {

                        const allOptions = [
                          "north",
                          "east",
                          "southEast",
                          "export",
                          "west",
                          "southWest",
                          "industry",
                          "other"
                        ];
                        field.onChange(allOptions);
                      } else {
                        field.onChange(selectedValue);
                      }
                    }}
                    error={!!errors.salesArea}
                    helperText={errors.salesArea && errors.salesArea.message}
                  >
                    <MenuItem value="all">All </MenuItem>
                    <MenuItem value="north">north </MenuItem>
                    <MenuItem value="east">east </MenuItem>
                    <MenuItem value="southEast">southEast </MenuItem>
                    <MenuItem value="export">export </MenuItem>
                    <MenuItem value="west">west </MenuItem>
                    <MenuItem value="southWest">southWest </MenuItem>
                    <MenuItem value="industry">industry </MenuItem>
                    <MenuItem value="other">other </MenuItem>
                  </Select>


                  {errors.salesArea && errors.salesArea && (
                    <p className="error">{errors.salesArea.message}</p>
                  )}
                </>
              )}
            />
            <InputLabel>User Type </InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: "UserType  is required" }}
              render={({ field }) => (
                <>
                  <Select
                    fullWidth
                    {...field}
                    className="user_select"
                    input={<OutlinedInput />}
                    value={field.value}
                    onChange={(event) => {
                      const selectedValue = event.target.value;

                      field.onChange(selectedValue);
                    }}
                    error={!!errors.role}
                    helperText={errors.role && errors.role.message}
                  >
                    <MenuItem value="User">Außendienst </MenuItem>
                    <MenuItem value="Admin">Administrator </MenuItem>
                  </Select>
                  {errors.role && errors.role && (
                    <p className="error">{errors.role.message}</p>
                  )}
                </>
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
              Speichern
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default Add;

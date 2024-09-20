import {
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
    TextField
} from "../../helper/imports/Imports";

export function ModalWithInputField({ open, onClose, title, onSubmit, inputLabel, inputName }) {
    const { handleSubmit, control, formState: { errors } } = useForm();
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                className="modal_form"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <InputLabel>{inputLabel}</InputLabel>
                        <Controller
                            name={inputName}
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                                <TextField
                                    type={"text"}
                                    fullWidth
                                    value={field.value}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    error={!!errors[inputName]}
                                    helperText={errors[inputName]?.message}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={onClose}
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
        </>
    )
}

export function CommonConfirmationModal({ isModalOpen, handleClose, handleSave, modalTitle }) {
    return (
        <Dialog
            open={isModalOpen}
            onClose={handleClose}
            fullWidth
            className="modal_form"
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {modalTitle}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogActions sx={{ justifyContent: "center", margin: "10px" }}>
                <Button variant="contained" onClick={handleClose} color="error">
                    Close
                </Button>
                <Button variant="contained" color="success" onClick={handleSave}>
                    Speichern
                </Button>
            </DialogActions>
        </Dialog>
    )
}
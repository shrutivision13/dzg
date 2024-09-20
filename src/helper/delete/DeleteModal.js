import React from "react";
import {
  Dialog, DialogTitle, IconButton, DialogContent,
  DialogActions, Button, CloseIcon
} from '../../helper/imports/Imports';

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  deleteHandler,
  name,
}) {
  const handleClose = () => setShowDeleteModal(false);

  return (
    <>
      <Dialog
        open={showDeleteModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogTitle sx={{ m: 0, p: 2 }} >
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
        <DialogContent sx={{ m: 0, ps: 2 }}  >
          <p>Are You Sure Want To Remove This Record?</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleClose()} color='error'>
            No
          </Button>
          <Button variant="contained" color="success" onClick={() => {
            deleteHandler();
            handleClose();
          }}>
            yes
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
}

export default DeleteModal;

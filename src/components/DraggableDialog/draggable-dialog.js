import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', fontWeight:700 }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.cancelButtonTitle && props.cancelButtonTitle != '' && <Button autoFocus onClick={handleClose}>
            {props.cancelButtonTitle}
          </Button>}
          {props.confirmButtonTitle === 'Yes' && <Button onClick={props.confirm}> {props.confirmButtonTitle}</Button>}
          {props.confirmButtonTitle !== 'Yes' && <Button onClick={handleClose}> {props.confirmButtonTitle}</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
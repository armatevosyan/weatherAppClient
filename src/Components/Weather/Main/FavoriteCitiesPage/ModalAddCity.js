import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddLocation from "./AddLocation";
import {DialogTitle} from "@material-ui/core";

function PaperComponent(props) {

  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const ModalAddCity =() => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonGroup>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Favorite
          </Button>
      </ButtonGroup>
      {open &&
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{padding: '15px'}} id="responsive-dialog-title"> Favorite City</DialogTitle>
          <DialogContent>
            <AddLocation setOpen={setOpen} handleClose={handleClose}/>
          </DialogContent>
        </Dialog>
      }
    </div>
  );
};
export default ModalAddCity;

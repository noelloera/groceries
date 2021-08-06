import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
//MaterialUI Icon
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listIcon: {
    cursor: "pointer",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    borderRadius: "1em",
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    outline: 0,
  },
}));

const EditListModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    props.setCurrent(props.value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Contents of the displayed modal
  const body = (
    <div className={classes.paper}>
      <form
        name="listEdit"
        onSubmit={(e) => {
          props.onSubmit(e, props.index, props.id);
          handleClose();
        }}
      >
        <Box
          borderBottom={1.1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Typography>{props.value} Details</Typography>
          <Button type="submit" color="primary">
            Done
          </Button>
        </Box>
        <Box pt={2} display="flex" width="100%" justifyContent="center">
          <TextField
            fullWidth
            className={classes.TextField}
            name="currentList"
            onChange={(e) => {
              props.onChange(e, props.index);
            }}
            value={props.currentList}
          />
        </Box>
      </form>
      <Divider />
      <form
        onSubmit={(e) => {
          props.delete(e, props.index, props.id);
        }}
      >
        <Box pt={2} display="flex" alignItems="center" justifyContent="center">
          <Button
            color="secondary"
            onClick={(e) => {
              props.delete(e, props.index, props.id);
              handleClose();
            }}
            startIcon={<DeleteIcon />}
          >
            Delete List
          </Button>
        </Box>
      </form>
    </div>
  );

  return (
    <div>
      <InfoOutlinedIcon
        className={classes.listIcon}
        color="primary"
        type="button"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default EditListModal;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IDialogRemoveItemCart {
  open: boolean;
  onClose: () => void;
  handleDialog: (paran: boolean) => void;
}

export default function DialogRemoveItemCart({
  open,
  onClose,
  handleDialog,
}: IDialogRemoveItemCart) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Remove product from cart?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove this product from your cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleDialog(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDialog(true);
          }}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

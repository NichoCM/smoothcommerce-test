"use client"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { addItem } from "../store/inventorySlice"

export interface CreateInventoryDialogProps {
  open: boolean
  onClose: () => void
}

// Dialog to add items to the inventory store
export default function CreateInventoryDialog({
  open,
  onClose,
}: CreateInventoryDialogProps) {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      displayName: "",
      quantity: 0,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(addItem({ displayName: values.displayName, quantity: values.quantity }))
      resetForm()
      onClose()
    },
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add Inventory Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="displayName"
            name="displayName"
            label="Display Name"
            fullWidth
            value={formik.values.displayName}
            onChange={formik.handleChange}
          />
          <TextField
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={formik.values.quantity}
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

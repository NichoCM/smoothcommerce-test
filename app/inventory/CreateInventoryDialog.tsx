"use client"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import { useFormik } from "formik"
import { memo, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { addItem } from "../store/inventorySlice"

const inventoryItemSchema = yup.object({
  displayName: yup
    .string()
    .min(4, "Display name must be longer than 3 characters")
    .required(),
  quantity: yup
    .number()
    .moreThan(0, "Quantity must be greater than 0")
    .required(),
})

export interface CreateInventoryDialogProps {
  open: boolean
  onClose: () => void
}

// Dialog to add items to the inventory store
export default memo(function CreateInventoryDialog({
  open,
  onClose,
}: CreateInventoryDialogProps) {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      displayName: "",
      quantity: "",
    },
    validationSchema: inventoryItemSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addItem({
          displayName: values.displayName,
          quantity: parseInt(values.quantity),
        }),
      )
      resetForm()
      onClose()
    },
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add Inventory Item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              margin="dense"
              id="displayName"
              name="displayName"
              label="Display Name"
              fullWidth
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.displayName && Boolean(formik.errors.displayName)
              }
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
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
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formik.dirty || !formik.isValid}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})

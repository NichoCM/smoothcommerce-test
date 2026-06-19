import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { InventoryItem } from "../types"

interface InventoryState {
  items: InventoryItem[]
}

const initialState: InventoryState = {
  items: [],
}

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<InventoryItem[]>) {
      state.items = action.payload
    },
    addItem(state, action: PayloadAction<InventoryItem>) {
      state.items.push(action.payload)
    },
  },
})

export const { setItems, addItem } = inventorySlice.actions
export default inventorySlice.reducer

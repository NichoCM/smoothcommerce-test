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
    // Omit the ID when we add a new item - the reducer will calcualte the next ID
    addItem(state, action: PayloadAction<Omit<InventoryItem, "id">>) {
      // Get the max ID and add 1 to generate the next ID
      const nextId = Math.max(...state.items.map((item) => item.id), 0) + 1
      state.items.push({ ...action.payload, id: nextId } as InventoryItem)
    },
  },
})

export const { setItems, addItem } = inventorySlice.actions
export default inventorySlice.reducer

"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { setItems } from "../store/inventorySlice"
import { InventoryItem, JsonPlaceholderTodo } from "../types"
import InventoryTable from "./InventoryTable"
import Typography from "@mui/material/Typography"
import { Button, Stack, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CreateInventoryDialog from "./CreateInventoryDialog"

const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos"
const TODO_FETCH_LIMIT = 30

export default function InventoryPage() {
  const dispatch = useDispatch<AppDispatch>()

  // Toggle showing or hiding the create dialog
  const [showCreate, setShowCreate] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")
  const [debouncedFilter, setDebouncedFilter] = useState("")

  // Debounce the search filter to avoid filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(searchFilter), 300)
    return () => clearTimeout(timer)
  }, [searchFilter])

  useEffect(() => {
    const controller = new AbortController()
    fetch(JSON_PLACEHOLDER_URL, { signal: controller.signal })
      .then((response) => response.json() as Promise<JsonPlaceholderTodo[]>)
      .then(
        (data) =>
          data
            .slice(0, TODO_FETCH_LIMIT)
            .map((todo) => ({ displayName: todo.title, quantity: 0, id: todo.id })) as InventoryItem[],
      )
      .then((inventoryItems) => dispatch(setItems(inventoryItems)))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted")
        } else {
          console.error("Error fetching inventory:", error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [dispatch])

  return (
    <Stack spacing={2}>
      <Stack
        useFlexGap
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6">Inventory</Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search by display name"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <Button
            onClick={() => setShowCreate(true)}
            startIcon={<AddIcon />}
            variant="contained"
          >
            New Item
          </Button>
        </Stack>
      </Stack>
      <InventoryTable searchFilter={debouncedFilter} />
      <CreateInventoryDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </Stack>
  )
}

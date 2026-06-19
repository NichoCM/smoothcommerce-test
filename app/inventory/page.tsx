'use client'

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { setItems } from "../store/inventorySlice"
import { InventoryItem, JsonPlaceholderTodo } from "../types"
import InventoryTable from "../InventoryTable"
import Typography from "@mui/material/Typography"

const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos"
const TODO_FETCH_LIMIT = 30

export default function InventoryPage() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const controller = new AbortController()
    fetch(JSON_PLACEHOLDER_URL, { signal: controller.signal })
      .then((response) => response.json() as Promise<JsonPlaceholderTodo[]>)
      .then(data => data.slice(0, TODO_FETCH_LIMIT).map(todo => ({ displayName: todo.title })) as InventoryItem[])
      .then((inventoryItems) => dispatch(setItems(inventoryItems)))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.error("Error fetching inventory:", error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [dispatch])

  return (
    <>
      <Typography variant="h4" gutterBottom>Inventory</Typography>
      <InventoryTable />
    </>
  )
}

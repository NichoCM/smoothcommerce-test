"use client"

import { useEffect } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { store } from "./store/store"
import type { AppDispatch, RootState } from "./store/store"
import { setItems } from "./store/inventorySlice"
import type { JsonPlaceholderTodo, InventoryItem } from "./types"

const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos"
const TODO_FETCH_LIMIT = 30

function InventoryLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.inventory.items)

  useEffect(() => {
    if (items.length > 0) return

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
  }, [dispatch, items.length])

  return <>{children}</>
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <InventoryLoader>{children}</InventoryLoader>
    </Provider>
  )
}

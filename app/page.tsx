'use client'

import styles from "./page.module.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store/store"
import { setItems } from "./store/inventorySlice"
import { InventoryItem, JsonPlaceholderTodo } from "./types"

const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos"
const TODO_FETCH_LIMIT = 30

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.inventory.items)

  useEffect(() => {
    // Adding a way to cancel the fetch request if the component unmounts before it completes.
    // React Strict mode double fires useEffect in dev mode to help identify side effects, so we need
    // to clean up the effect properly to avoid unwanted state updates.
    const controller = new AbortController();
    fetch(JSON_PLACEHOLDER_URL, {
      signal: controller.signal
    })
      .then((response) => response.json() as Promise<JsonPlaceholderTodo[]>)
      // Slice to the desired limit and cast the JSON todo to the InventoryItem structure expected by our application
      .then(data => data.slice(0, TODO_FETCH_LIMIT).map(todo => ({ displayName: todo.title })) as InventoryItem[])
      // Set the fetched items in the Redux store
      .then((inventoryItems) => dispatch(setItems(inventoryItems)))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error("Error fetching inventory:", error);
        }
      })

      // Cleanup function to abort the fetch request if the component unmounts
      return () => {
        controller.abort()
      }
  }, [dispatch])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {items.map((item, index) => (
          <div key={index}>{item.displayName}</div>
        ))}
      </main>
    </div>
  );
}

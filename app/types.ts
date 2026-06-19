// Representation of the jsonplaceholder API response for a todo item
export interface JsonPlaceholderTodo {
    userId: number
    id: number
    title: string
    completed: boolean
}

// Desired inventory item structure for our application
export interface InventoryItem {
    displayName: string
}

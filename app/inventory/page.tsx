"use client"

import { useCallback, useEffect, useState } from "react"
import InventoryTable from "./InventoryTable"
import Typography from "@mui/material/Typography"
import { Button, Stack, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CreateInventoryDialog from "./CreateInventoryDialog"

export default function InventoryPage() {
  // Toggle showing or hiding the create dialog
  const [showCreate, setShowCreate] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")
  const [debouncedFilter, setDebouncedFilter] = useState("")
  const handleCloseCreate = useCallback(() => setShowCreate(false), [])

  // Debounce the search filter to avoid filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(searchFilter), 300)
    return () => clearTimeout(timer)
  }, [searchFilter])

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
      <CreateInventoryDialog open={showCreate} onClose={handleCloseCreate} />
    </Stack>
  )
}

"use client"

import { memo, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import type { InventoryItem } from "../types"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from "@mui/material/TablePagination"
import Paper from "@mui/material/Paper"
import { TableSortLabel } from "@mui/material"
import { comparison } from "../utils"

interface InventoryTableProps {
  searchFilter: string
}

export default memo(function InventoryTable({
  searchFilter,
}: InventoryTableProps) {
  const items = useSelector((state: RootState) => state.inventory.items)

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Sort state, default column to null
  const [sortColumn, setSortColumn] = useState<keyof InventoryItem | null>(null)
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >(undefined)

  // Handle sorting when a column header is clicked - toggle between asc, desc, and no sort
  const handleSort = useCallback(
    (column: keyof InventoryItem) => {
      if (sortColumn === column) {
        if (sortDirection === "asc") {
          setSortDirection("desc")
        } else if (sortDirection === "desc") {
          setSortColumn(null)
          setSortDirection(undefined)
        } else {
          setSortDirection("asc")
        }
      } else {
        setSortColumn(column)
        setSortDirection("asc")
      }
    },
    [sortColumn, sortDirection],
  )

  // Get filtered items (case-insensitive) on the display name
  const filteredItems = useMemo(() => {
    if (!searchFilter) return items
    const lowerFilter = searchFilter.toLowerCase()
    return items.filter((item) =>
      item.displayName.toLowerCase().includes(lowerFilter),
    )
  }, [items, searchFilter])

  // Sort the inventory items by the configuration
  const sortedItems = useMemo(() => {
    if (!sortColumn) return [...filteredItems]
    return [...filteredItems].sort(
      (a, b) =>
        comparison(a[sortColumn], b[sortColumn]) *
        (sortDirection === "asc" ? 1 : -1),
    )
  }, [filteredItems, sortDirection, sortColumn])

  // Memoize the paginated items **after sorting** to avoid based on the current items
  // page and rows to avoid unecessary rerenders
  const paginatedItems = useMemo(() => {
    return sortedItems.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    )
  }, [sortedItems, page, rowsPerPage])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 80 }}>ID</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "displayName"}
                  direction={
                    sortColumn === "displayName" ? sortDirection : "asc"
                  }
                  onClick={() => handleSort("displayName")}
                >
                  Display Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 120 }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id.toString()}</TableCell>
                <TableCell>{item.displayName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredItems.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[5, 10]}
      />
    </>
  )
})

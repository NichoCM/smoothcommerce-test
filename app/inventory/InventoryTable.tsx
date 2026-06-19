"use client"

import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from "@mui/material/TablePagination"
import Paper from "@mui/material/Paper"

export default function InventoryTable() {
  const items = useSelector((state: RootState) => state.inventory.items)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Memoize the paginated items to avoid based on the current items, page and rows
  // to avoid unecessary rerenders
  const paginatedItems = useMemo(() => {
    return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [items, page, rowsPerPage])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Display Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.displayName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={items.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  )
}

"use client"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import type { RootState } from "./store/store"
import Sidebar from "./Sidebar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

"use client"

import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store/store"
import { toggleMode } from "./store/themeSlice"
import { ListItemSecondaryAction } from "@mui/material"

const DRAWER_WIDTH = 240

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Settings", href: "/settings" },
]

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
      }}
    >
      <Toolbar>Temporary App Title</Toolbar>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          secondaryAction={
            <ListItemSecondaryAction>
              <IconButton
                edge={"end"}
                onClick={() => dispatch(toggleMode())}
                sx={{ ml: "auto" }}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </ListItemSecondaryAction>
          }
        >
          <ListItemText primary={"Theme"} />
        </ListItem>
      </List>
    </Drawer>
  )
}

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Typography,
  Divider,
  IconButton,
  Toolbar,
  List,
  Drawer,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import WindowIcon from "@mui/icons-material/Window";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddProductPage from "../pages/product/AddProductPage";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductsPage from "../pages/product/ProductsPage";
import UserPage from "pages/users/UserPage";
import { RootState } from '../store/store';
import { useSelector } from "react-redux";
const drawerWidth = 240;
const list = [
  { text: "Dashboard", icon: WindowIcon, options: ["Option 1", "Option 2"] },
  {
    text: "User",
    icon: PersonIcon,
    options: ["Add User", "Users", "Option C"],
  },
  {
    text: "Product",
    icon: ShoppingCartIcon,
    options: ["Add Product", "Products", "Option C"],
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    width: "100%", // Ensure full width on smaller screens
  },
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState<number | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const user = useSelector((state: RootState) => state.user.user);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleListItemClick = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"var(--primary)"}}>
        <Toolbar className="flex justify-between">
          <Box className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className="flex items-center">
            <IconButton size="large" color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account"
              onClick={handleOpenProfileMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorElProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElProfile)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseProfileMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="bg-background">
          {list.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleListItemClick(index)}>
                  <ListItemIcon>
                    <item.icon className="text-accent" />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  {expandedItem === index ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItemButton>
              </ListItem>
              {expandedItem === index && (
                <List>
                  {item.options.map((option, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton onClick={() => handleOptionClick(option)}>
                        <ListItemText primary={option} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

            <Main open={open} className="bg-background h-screen">
        <DrawerHeader />
        {selectedOption === "Users" && (
          <UserPage />
        )}
        {selectedOption === "Add Product" && (
          <AddProductPage />
        )}
        {selectedOption === "Products" && (
          <ProductsPage />
        )}
        {selectedOption === null && (
          <Typography paragraph>
            Default content when no option is selected
          </Typography>
        )}
      </Main>
    </Box>
  );
}

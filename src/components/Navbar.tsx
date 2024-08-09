import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  ButtonBase,
  MenuItem,
  Avatar,
  Tooltip,
  Container,
  Typography,
  Box,
  Menu,
  Drawer,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  const variantsUl = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  const DrawerList = (
    <div className="p-5">
      <Box
        sx={{ width: 200 }}
        role="presentation"
        className="flex justify-between items-center"
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "black",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ width: 200 }} role="presentation">
        <motion.ul
          className="container"
          variants={variantsUl}
          initial="hidden"
          animate="visible"
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.li
              key={index}
              variants={variants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MenuItem className="">123</MenuItem>
            </motion.li>
          ))}
        </motion.ul>
      </Box>
    </div>
  );
  return (
    <AppBar position="static" className="!bg-white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className={` ${
              isMobile ? "flex flex-grow items-center gap-2" : "hidden"
            }`}
          >
            <MenuIcon onClick={toggleDrawer(true)} sx={{ color: "black" }} />
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>
          {!isMobile && (
            <Box className="flex items-center">
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>

              <Button sx={{ color: "black" }}>Link 1</Button>
              <Button sx={{ color: "black" }}>Link 2</Button>
              <Button sx={{ color: "black" }}>Link 3</Button>
            </Box>
          )}

          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isMobile && (
              <div className="flex items-center bg-gray-200 p-2 rounded-md h-10">
                <InputBase
                  placeholder="Search…"
                  className="ml-2 flex-1 text-gray-800 "
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon sx={{ color: "black" }} />
                </IconButton>
              </div>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }} className="flex">
            {isMobile && (
              <IconButton edge="end" type="submit" aria-label="search">
                <SearchIcon sx={{ color: "black" }} />
              </IconButton>
            )}
            <IconButton edge="end" aria-label="account">
              <FavoriteBorderIcon sx={{ color: "black" }} />
            </IconButton>

            <IconButton edge="end" aria-label="cart">
              <ShoppingBagOutlinedIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

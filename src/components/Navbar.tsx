import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
  Drawer,
  useMediaQuery,
  Divider,
  Collapse,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Navbar = () => {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [openSearch, setOpenSearch] = React.useState(true);

  const handleClick = () => {
    setOpenSearch(!openSearch);
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
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}/>

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
              <IconButton
                edge="end"
                type="submit"
                aria-label="search"
                onClick={handleClick}
              >
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
        {isMobile && (
        <Collapse in={openSearch} timeout="auto" unmountOnExit>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center bg-gray-200 p-2 rounded-md h-10 mb-5"
        >
          <InputBase
            placeholder="Search…"
            className="ml-2 flex-1 text-gray-800"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>
        </motion.div>
      </Collapse>
        )}
      </Container>
    </AppBar>
  );
};

export default Navbar;

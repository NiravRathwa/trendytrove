import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ListSubheader,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Close, FilterAlt, KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ProductCard from "components/ProductCard";
import { motion } from "framer-motion";
import FilterComponent from "components/FilterComponent";
import { useGetProductsQuery } from "store/apiSlice";

interface Category {
  name: string;
  href: string;
}

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface SortOption {
  name: string;
  href: string;
  current: boolean;
}
type Props = {};
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

const ProductList: React.FC<Props> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openFilter, setOpenFilter] = useState<{ [key: string]: boolean }>({});

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleFilterToggle = (section: string) => {
    setOpenFilter((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const { data: products, isLoading } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
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

  const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          fullWidth
        >
          <DialogTitle className="flex justify-between items-center">
            <Typography variant="h6">Filters</Typography>
            <IconButton
              aria-label="close"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">Categories</ListSubheader>
              }
            >
              {subCategories.map((category) => (
                <ListItem key={category.name}>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
            {filters.map((section) => (
              <FilterComponent
                section={section}
                openFilter={openFilter}
                handleFilterToggle={handleFilterToggle}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMobileFiltersOpen(false)} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row  items-center md:items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <Typography variant="h4" component="h1" gutterBottom>
              New Arrivals
            </Typography>

            <div className="flex items-center justify-around">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="outlined"
                  onClick={handleSortClick}
                  className="!mx-2"
                  endIcon={<KeyboardArrowDown />}
                >
                  Sort
                </Button>
              </motion.div>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleSortClose}
              >
                {sortOptions.map((option, i) => (
                  <motion.div
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={option.name}
                  >
                    <MenuItem key={option.name} onClick={handleSortClose}>
                      <Typography
                        variant="body2"
                        // color={option.current ? "textPrimary" : "textSecondary"}
                        style={{ color: `2px solid ${colors[i]}` }}
                      >
                        {option.name}
                      </Typography>
                    </MenuItem>
                  </motion.div>
                ))}
              </Menu>

              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    variant="outlined"
                    className="!mx-2"
                    onClick={() => setMobileFiltersOpen(true)}
                    endIcon={<FilterAlt />}
                  >
                    Filter
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <Grid container spacing={4}>
              {!isMobile && (
                <Grid item xs={12} md={3}>
                  <div>
                    <List
                      component="nav"
                      subheader={
                        <ListSubheader component="div">
                          Categories
                        </ListSubheader>
                      }
                    >
                      {subCategories.map((category) => (
                        <ListItem key={category.name}>
                          <ListItemText primary={category.name} />
                        </ListItem>
                      ))}
                    </List>

                    {filters.map((section) => (
                      <FilterComponent
                        section={section}
                        openFilter={openFilter}
                        handleFilterToggle={handleFilterToggle}
                      />
                    ))}
                  </div>
                </Grid>
              )}
              <Grid item xs={12} md={9}>
                <div className="flex flex-wrap justify-center gap-4 p-4">
               
                    {products?.success &&
                      products?.data?.products.map((product: any) => (
                        <ProductCard
                          key={product._id}
                          image={product.images[0]}
                          productName={product.name}
                          price={product.price}
                          discount={20}
                        />
                      ))}
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="100"
                    discount={90}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />{" "}
                  <ProductCard
                    image="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    productName="Sample Product"
                    price="99.99"
                    discount={20}
                  />
                </div>
              </Grid>
            </Grid>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductList;

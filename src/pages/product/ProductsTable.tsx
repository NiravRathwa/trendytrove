import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { useGetProductsQuery } from "store/apiSlice";
import TablePagination from "@mui/material/TablePagination";
import Loader from "components/Loader";
import { toast, ToastContainer } from "react-toastify";
import AddProduct from "./AddProduct";

type Product = {
  name: string;
  price: number;
  stock: number;
};

const ProductsTable: React.FC = () => {
  const theme = useTheme();
  const { data: products, isLoading } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (product: any) => (event: any) => {
    setOpen(true);
    setEditData(product);
  };
  return (
    <div className="overflow-x-auto my-8">
      <TableContainer component={Paper}>
        <ToastContainer />
        {open && (
          <AddProduct open={open} setOpen={setOpen} editData={editData} />
        )}
        {isLoading && <Loader />}
        <Table sx={{ minWidth: 350 }} aria-label="Products Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.success &&
              products?.data?.products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product: Product, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        sx={{ color: theme.palette.customText[500] }}
                        onClick={handleEdit(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: theme.palette.customAccent[500] }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={products?.data?.products?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ProductsTable;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Icon,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import API from "services/api";
import { useTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import Loader from "components/Loader";
type User = {
  email: string;
  phone:string ;
};
type Props = {}

const UsersTable = (props: Props) => {
    const theme = useTheme();
    const [users, setUsers] = useState<User[]>([]);
    const [loading,setLoading]=useState<boolean>(false)
    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true)
        const res = await API.getUsers();
        setLoading(false)
        if (res?.success) {
            console.log(res.data)
          setUsers(res.data.users);
        }
      };
      fetchProduct();
    }, []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
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
  console.log(users)
  useEffect(() => {
  }, [users])
  
  return (
    <div className="overflow-x-auto my-8" >
    <TableContainer component={Paper}>
      {loading && <Loader/>}
      <Table sx={{ minWidth: 350 }} aria-label="Products Table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton sx={{ color: theme.palette.customText[500] }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: theme.palette.customAccent[500] }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={users?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  </div>
  )
}

export default UsersTable
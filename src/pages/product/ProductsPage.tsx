import React, { useState } from "react";
import PageHeader from "../../components/Pageheader";
import ProductsTable from "./ProductsTable";
import AddProduct from "./AddProduct";
// import Products from "./Products";

type Props = {};

const ProductsPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAdd = () => {
    console.log("Add button clicked");
    setOpen(true);
  };
  return (
    <>
      <PageHeader onSearch={handleSearch} onAdd={handleAdd} />
      {open && <AddProduct open={open} setOpen={setOpen}/>}
      <ProductsTable />
    </>
  );
};

export default ProductsPage;

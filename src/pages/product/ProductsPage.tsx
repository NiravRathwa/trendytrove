import React, { useState } from "react";
import PageHeader from "../../components/Pageheader";
import ProductsTable from "./ProductsTable";
// import Products from "./Products";

type Props = {};

const ProductsPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAdd = () => {
    console.log("Add button clicked");
  };
  return (
    <>
      <PageHeader  onSearch={handleSearch} onAdd={handleAdd} />
      <ProductsTable/>
    </>
  );
};

export default ProductsPage;

import React from "react";
import PageHeader from "../../components/Pageheader";
import { useState } from "react";
type Props = {};

const AddProductPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAdd = () => {
    console.log("Add button clicked");
  };
  return (
    <div>
      <PageHeader onSearch={handleSearch} onAdd={handleAdd} />
    </div>
  );
};

export default AddProductPage;

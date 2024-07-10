
import React, { ChangeEvent } from "react";
import {
  Button,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomSearch from "./customSearch";
import { StaggeredLabel } from "./StaggerdLabel";

interface PageHeaderProps {
  onSearch: (value: string) => void;
  onAdd: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({  onSearch, onAdd }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <CustomSearch label={<StaggeredLabel text="Search..." />} fullWidth />
      </Grid>
      <Grid item sm={4} />

      <Grid item xs={12} sm={2} onClick={onAdd}>
        <Button variant="contained" fullWidth startIcon={<AddIcon />}>
          Add
        </Button>
      </Grid>
      
    </Grid>
  );
};

export default PageHeader;

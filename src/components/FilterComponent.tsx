import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
type Props = {
  section: any;
  openFilter: { [key: string]: boolean };
  handleFilterToggle: (id: string) => void;
};

const FilterComponent: React.FC<Props> = ({
  section,
  openFilter,
  handleFilterToggle,
}) => {
  return (
    <div key={section.id}>
      <ListItem onClick={() => handleFilterToggle(section.id)}>
        <ListItemText primary={section.name} />
        {openFilter[section.id] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openFilter[section.id]} timeout="auto" unmountOnExit>
        <FormGroup style={{ paddingLeft: 16 }}>
          {section.options.map((option: any,) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  defaultChecked={option.checked}
                  name={`${section.id}[]`}
                  color="primary"
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </Collapse>
    </div>
  );
};

export default FilterComponent;

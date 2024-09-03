import React from "react";
import { Select, FormControl, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";

interface PickerProps {
  type: "font" | "color";
  typeArray: string[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const Picker: React.FC<PickerProps> = ({ type, typeArray, value, onChange }) => {
  //const sxType = type === "font" ? "fontFamily" : "color";
  return (
    <FormControl>
      <InputLabel id={`${type}-dropdown-label`}>Choose a {type}</InputLabel>
      <Select
        labelId={`${type}-dropdown-label`}
        id={`${type}-dropdown`}
        value={value}
        label={`Choose a ${type}`}
        onChange={onChange}
        sx={{
          width: 200,
          height: 50,
        }}
      >
        {typeArray.map(item => (
          <MenuItem key={item} value={item} sx={{ fontFamily: item }}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl> 
  );
};

export default Picker;
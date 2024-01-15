import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { green, red } from '@mui/material/colors';

const GreenRedSwitch = ({checked}) => {
  const [MChecked, setMChecked] = useState(checked)
  const handleChange = () => {
    setMChecked((prev) => !prev);
  };

  return (
    <Switch
      checked={MChecked}
      onChange={handleChange}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: green[500], // Change color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: green[500], // Change track color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked:hover': {
          backgroundColor: green[700], // Change hover color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked:hover + .MuiSwitch-track': {
          backgroundColor: green[700], // Change hover track color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-thumb': {
          color: 'white', // Change thumb color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked:hover + .MuiSwitch-thumb': {
          color: 'white', // Change hover thumb color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked:hover + .MuiSwitch-thumb': {
          color: 'white', // Change hover thumb color when switch is checked
        },
        '& .MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
          color: green[200], // Change color when switch is checked and disabled
        },
        '& .MuiSwitch-switchBase.Mui-checked.Mui-disabled + .MuiSwitch-track': {
          backgroundColor: green[200], // Change track color when switch is checked and disabled
        },
      }}
    />
  );
};

export default GreenRedSwitch;

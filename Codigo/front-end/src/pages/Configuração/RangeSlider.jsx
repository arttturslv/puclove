import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({setIdades, idades}) {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setIdades(newValue);
  };

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Raio de idade'}
        value={idades}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={18}
      />
    </Box>
  );
}

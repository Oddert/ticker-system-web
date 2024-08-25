import { createTheme, ThemeOptions } from '@mui/material';

import breakpoints from './breakpoints';
import components from './components';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import zIndex from './zIndex';

const themeOptions: ThemeOptions = {
    breakpoints,
    components,
    palette,
    shadows,
    typography,
    zIndex,
};

const theme = createTheme(themeOptions);

export default theme;

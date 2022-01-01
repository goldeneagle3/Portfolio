import { createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";


const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#283747",
      main: "#283747",
      dark: "#283747",
      contrastText: "#fff",
    },
    secondary: {
      light: "#0BB4EC",
      main: "#0BB4EC",
      dark: "#0BB4EC",
      contrastText: "#000",
    },
    openTitle: "#3f4771",
    protectedTitle: yellow["400"],
    type: "light",
  },
});
export default theme;

import { createTheme } from "@material-ui/core";
//import desired fonts
import "typeface-almarai";
//Uncomment when you need to use the theme props
//const defaultTheme = createMuiTheme({});
//Theme holds all app styling configurations
const theme = {
  palette: {
    primary: { main: "#ff5722", contrastText: "#ffffff" },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: "Almarai",
    //Logo Typography
    h1: {
      fontSize: "1.8em",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 600,
    },
    //Really small Links
    caption: {
      fontSize: "0.8rem",
    },
  },
};
//Specifies a dark palette, takes in theme as parameter
const darkTheme = createTheme(
  {
    palette: { type: "dark" },
  },
  theme
);
//Specifies a light palette, takes in theme as parameter
const lightTheme = createTheme(
  {
    palette: { type: "light" },
  },
  theme
);
export { darkTheme, lightTheme };

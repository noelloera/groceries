import { createMuiTheme } from "@material-ui/core";
//import desired fonts
import "typeface-almarai";

//Instead of using default theme try calling theme itself
//const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#ff5722", contrastText: "#ffffff" },
    secondary: { main: "#fff", contrastText: "#ffffff" },
  },
  typography: {
    fontFamily: "Almarai",
  },
});

export default theme;

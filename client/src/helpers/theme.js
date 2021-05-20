import { createMuiTheme } from "@material-ui/core";
//import desired fonts
import "typeface-almarai";

//Instead of using default theme try calling theme itself
//const defaultTheme = createMuiTheme();
let theme = createMuiTheme({
  palette: {
    //Variable that changes light and dark mode {outside event}
    primary: { main: "#ff5722", contrastText: "#ffffff" },
    secondary: { main: "#fff", contrastText: "#ffffff" },
  },
  typography: {
    fontFamily: "Almarai",
  },
});

export default theme;

import groceriesImg from "../assets/groceries.jpg";
//All of the component styling goes here
const styles = (theme) => ({
  //Login edits entirety including the image in desktop
  content: {
    background: "rgba(0,0,0,1)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "87vh",
    },
  },
  image: {
    height: "95vh",
    backgroundImage: `url(${groceriesImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "1em",
    //Sets the maximum resolutions for larger devices
    maxWidth: "600px",
    maxHeight: "1000px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  //Paper edits the actual form
  paper: {
    height: "95vh",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1em",
    overflow: "scroll",
    //Sets the maximum resolutions for larger devices
    maxWidth: "600px",
    maxHeight: "1000px",

    [theme.breakpoints.down("sm")]: {
      height: "83vh",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  option: {
    float: "right",
    textAlign: "right",
  },

  listsPaper: {
    height: "95vh",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1em",
    overflow: "scroll",
    //Sets the maximum resolutions for larger devices
    maxWidth: "600px",
    maxHeight: "1000px",
    [theme.breakpoints.down("sm")]: {
      height: "83vh",
    },
  },
  username: {
    overflow: "hidden",
  },
  topBar: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    height: "3rem",
  },
  item: {
    width: "33%",
    overflow: "hidden",
  },
  centerItem: {
    textAlign: "center",
    width: "33%",
  },
  rightItem: {
    width: "33%",
    textAlign: "right",
  },
  listItem: {
    display: "flex",
    width: "100%",
  },
  textField: {
    width: "100%",
  },
});
export default styles;

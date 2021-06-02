import groceriesImg from "../assets/groceries.jpg";
//All of the component styling goes here
const styles = (theme) => ({
  app: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  //Login edits entirety including the image in desktop
  login: {
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  //Form holds the grid that takes up 12 in xs

  //Paper edits the actual form
  paper: {
    height: "95vh",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1em",
    overflow: "scroll",
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

  //Lists
  content: {
    background: "rgba(0,0,0,1)",
    height: "100vh",
    [theme.breakpoints.down("md")]: {
      height: "87vh",
    },

    listsPaper: {
      height: "95vh",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "1em",
      overflow: "scroll",
      [theme.breakpoints.down("sm")]: {
        height: "83vh",
      },
    },
  },
});
export default styles;

import groceriesImg from "../assets/groceries.jpg";
//All of the component styling goes here
const styles = (theme) => ({
  app: {
    background: "rgba(0,0,0)",
    height: "100vh",
    overflow: "hidden",
    maxWidth: "1480px",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      height: "87vh",
    },
  },
  //Login edits entirety including the image in desktop
  content: {
    overflow: "hidden",
    background: "rgba(0,0,0)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    //maxWidth: "1480px",
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
    maxHeight: "1000px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  //Paper edits the actual form
  paper: {
    overflow: "hidden",
    height: "95vh",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1em",
    //Sets the maximum resolutions for larger devices
    maxHeight: "1000px",
    [theme.breakpoints.down("sm")]: {
      height: "83vh",
    },
  },
  avatar: {
    width: "4em",
    height: "4em",
    margin: theme.spacing(1),
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
  //SplashScreen

  //DisplayedContent
  contentDisplay: {
    height: "95vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1em",
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
  syncIcon: {
    width: "33%",
    cursor: "pointer",
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
    alignItems: "center",
  },
  textField: {
    width: "100%",
  },
  allListed: {
    overflow: "scroll",
    height: "90%",
  },
  //Edit Modal
  listIcon: {
    cursor: "pointer",
  },
  editModal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    borderRadius: "1em",
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    outline: 0,
  },
});
export default styles;

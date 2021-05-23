import groceriesImg from "../assets/groceries.jpg";
//All of the component styling goes here
const styles = (theme) => ({
  //App
  app: {
    height: "100vh",
  },
  //Login
  login: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${groceriesImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    height: "100vh",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
});
export default styles;

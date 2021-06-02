import groceriesImg from "../assets/groceries.jpg";
//All of the component styling goes here
const styles = (theme) => ({
  //Login edits entirety including the image in desktop
  login: {
    background: "rgba(0,0,0,1)",
  },
  image: {
    height: "90vh",
    backgroundImage: `url(${groceriesImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "1em",
  },
  //Form holds the grid that takes up 12 in xs

  //Paper edits the actual form
  paper: {
    height: "90vh",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1em",
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

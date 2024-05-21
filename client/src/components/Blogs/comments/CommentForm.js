import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Person } from "@material-ui/icons"; // Import the Person icon

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    width: "100%",
    maxWidth: 1000,
    margin: "0 auto",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  profileIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary, // Customize the color if needed
  },
  textField: {
    marginBottom: theme.spacing(2),
    "& .MuiInputBase-root": {
      fontSize: "0.875rem", // Reduce font size
      padding: theme.spacing(1), // Reduce padding
    },
    "& .MuiOutlinedInput-inputMultiline": {
      padding: theme.spacing(1), // Reduce padding for multiline input
    },
  },
  submitButton: {
    alignSelf: "flex-end",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    padding: theme.spacing(1, 3), // Adjusted padding for a more compact button
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});

const CommentForm = ({ blogId, currentUser }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <Person className={classes.profileIcon} />{" "}
          <Typography variant="h6">{currentUser}</Typography>
        </div>
        <TextField
          label="Comment"
          variant="outlined"
          className={classes.textField}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          maxRows={3}
          required
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          className={classes.submitButton}
          disabled={!text.trim()}
        >
          Submit
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default CommentForm;
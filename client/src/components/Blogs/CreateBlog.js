import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Button,
  Typography,
  CssBaseline,
  MenuItem,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { createBlogAPI } from "../../utils/api"; // Ensure this import is correct
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f8f9fa",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  formContainer: {
    maxWidth: 800,
    width: "800px",
    padding: theme.spacing(4),
    borderRadius: 8,
    background: "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  label: {
    fontSize: "1.2rem", // Adjust font size as needed
    marginBottom: theme.spacing(1), // Add spacing between label and field
  },
}));

const CreateBlog = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    featuredImage: null,
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "featuredImage" ? files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    const token = localStorage.getItem("token");

    try {
      const response = await createBlogAPI(data,token);
      if (response.status === 201) {
        toast.success("Created successfully");
        navigate("/");
      } else {
        toast.error("Error while creating.");
      }
    } catch (error) {
      toast.error("Error while creating.");
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.formContainer}>
        <Typography variant="h4" align="center" gutterBottom>
          Create a New Blog Post
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="subtitle1" className={classes.label}>
            Title
          </Typography>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            className={classes.field}
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Typography variant="subtitle1" className={classes.label}>
            Content
          </Typography>
          <TextField
            label="Content"
            name="content"
            variant="outlined"
            multiline
            minRows={10}
            className={classes.field}
            value={formData.content}
            onChange={handleChange}
            required
          />
          <Typography variant="subtitle1" className={classes.label}>
            Category
          </Typography>
          <TextField
            label="Category"
            name="category"
            variant="outlined"
            select
            className={classes.field}
            value={formData.category}
            onChange={handleChange}
            required
          >
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </TextField>
          <Typography variant="subtitle1" className={classes.label}>
            Featured Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            name="featuredImage"
            className={classes.field}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
          >
            Create Blog
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CreateBlog;

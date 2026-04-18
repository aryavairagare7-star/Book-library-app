import { useState } from "react";
import { addBook } from "../services/BookServices";
import { useNavigate } from "react-router-dom";

// MUI Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// MUI Core
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
  Divider
} from "@mui/material";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    genre: "",
    description: "",
    pages: ""
  });

  // ✅ separate state for date
  const [publishedDate, setPublishedDate] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fixedForm = {
      ...form,
      published: publishedDate
        ? publishedDate.format("YYYY-MM-DD")
        : "",
      price: form.price.toString(),
      pages: form.pages.toString(),
    };

    await addBook(fixedForm);

    navigate("/", {
      state: { message: "Book added successfully ✅" }
    });
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          borderRadius: 4,
          boxShadow: 3
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={1}>
          Add New Book
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Fill in the details below to add a new book
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>

          {/* 📘 Basic Info */}
          <Typography variant="subtitle2" mb={1}>
            Basic Info
          </Typography>

          <TextField
            fullWidth
            label="Title"
            name="title"
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Author"
            name="author"
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Genre"
            name="genre"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* 📅 Details */}
          <Typography variant="subtitle2" mb={1}>
            Details
          </Typography>

          {/* ✅ Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Published Date"
              value={publishedDate}
              onChange={(newValue) => setPublishedDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { mb: 2 }
                }
              }}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            label="Pages"
            name="pages"
            type="number"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* 📝 Description */}
          <Typography variant="subtitle2" mb={1}>
            Description
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Add Book
          </Button>

        </Box>
      </Card>
    </Container>
  );
}

export default AddBook;
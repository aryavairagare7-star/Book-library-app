import { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/BookServices";
import { useNavigate, useParams } from "react-router-dom";

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

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    genre: "",
    description: "",
    pages: "",
  });

  // ✅ separate state for date
  const [publishedDate, setPublishedDate] = useState(null);

  useEffect(() => {
    getBook(id).then((res) => {
      const data = res.data;

      setForm({
        title: data.title || "",
        author: data.author || "",
        price: data.price || "",
        image: data.image || "",
        genre: data.genre || "",
        description: data.description || "",
        pages: data.pages || "",
      });

      // ✅ set date properly
      setPublishedDate(
        data.published ? dayjs(data.published) : null
      );
    });
  }, [id]);

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

    await updateBook(id, fixedForm);

    navigate("/", {
      state: { message: "Book updated successfully ✅" },
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
          Edit Book
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Update the book details
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
            value={form.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Author"
            name="author"
            value={form.author}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* 📅 Details */}
          <Typography variant="subtitle2" mb={1}>
            Details
          </Typography>

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
            value={form.pages}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
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
            value={form.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
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
            Update Book
          </Button>

        </Box>
      </Card>
    </Container>
  );
}

export default EditBook;
import { useEffect, useState } from "react";
import { getBook, deleteBook } from "../services/BookServices";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Container, Card, Typography, Button, Box } from "@mui/material";

function ViewBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      setLoading(true);
      const res = await getBook(id);
      setBook(res.data);
    } catch {
      toast.error("Failed to load book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(id);
      toast.success("Book deleted successfully");
      navigate("/");
    } catch {
      toast.error("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <Typography textAlign="center" mt={5}>
        Loading...
      </Typography>
    );
  }

  if (!book) return null;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        {/* 🔥 RESPONSIVE LAYOUT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { md: "flex-start", xs: "center" },
          }}
        >
          {/* 📸 IMAGE */}
          <Box
            sx={{
              width: { xs: "100%", md: "320px" },
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={book.image}
              alt={book.title}
              sx={{
                width: { xs: "180px", sm: "220px", md: "100%" }, // 🔥 smaller on mobile
                height: "auto",
                aspectRatio: "3 / 4",
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                display: "block",
              }}
            />
          </Box>

          {/* 📖 DETAILS */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {book.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Author: <strong>{book.author}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Genre: <strong>{book.genre}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Published: <strong>{book.published}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Pages: <strong>{book.pages}</strong>
            </Typography>

            <Typography sx={{ mt: 1 }} fontWeight={600}>
              Price: ₹{book.price}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {book.description}
              </Typography>
            </Box>

            {/* 🔘 ACTIONS */}
            <Box sx={{ mt: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate(`/edit/${book.id}`)}
              >
                Edit
              </Button>

              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>

              <Button variant="outlined" onClick={() => navigate("/")}>
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default ViewBook;

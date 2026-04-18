import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/BookServices";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import BookCard from "../components/BookCard";

// MUI
import { Container, Typography, Box, Select, MenuItem } from "@mui/material";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [genre, setGenre] = useState("all");

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  useEffect(() => {
    loadBooks();
  }, [q, genre, sortBy, order]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const res = await getBooks();
      let data = res.data;

      if (q) {
        data = data.filter(
          (book) =>
            book.title.toLowerCase().includes(q.toLowerCase()) ||
            book.author.toLowerCase().includes(q.toLowerCase()) ||
            book.genre.toLowerCase().includes(q.toLowerCase()),
        );
      }

      if (genre !== "all") {
        data = data.filter((book) => book.genre === genre);
      }

      data.sort((a, b) => {
        if (sortBy === "price") {
          return order === "asc"
            ? Number(a.price) - Number(b.price)
            : Number(b.price) - Number(a.price);
        }

        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });

      setBooks(data);
    } catch {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await deleteBook(id);
      toast.success("Book deleted");
      loadBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "center" },
          textAlign: { xs: "center", md: "left" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Available Books
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <Select
            size="small"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Self-help">Self-help</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Informative">Informative</MenuItem>
          </Select>

          <Select
            size="small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>

          <Select
            size="small"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Content */}
      {loading ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : books.length === 0 ? (
        <Typography textAlign="center">No books found.</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 3,
          }}
        >
          {books.map((book) => (
            <Box
              key={book.id}
              sx={{
                width: {
                  xs: 260, // 🔥 perfect mobile card width
                  sm: 300,
                  md: "calc(33.33% - 24px)",
                  lg: "calc(25% - 24px)",
                },
              }}
            >
              <BookCard book={book} onDelete={handleDelete} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Home;

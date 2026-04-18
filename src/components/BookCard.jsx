import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function BookCard({ book, onDelete }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.3s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={book.image}
        alt={book.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {book.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {book.author}
        </Typography>

        <Typography sx={{ mt: 1 }} fontWeight={500}>
          ₹{book.price}
        </Typography>

        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            size="small"
            variant="outlined"
            component={RouterLink}
            to={`/book/${book.id}`}
          >
            View
          </Button>

          <Button
            size="small"
            color="warning"
            variant="contained"
            component={RouterLink}
            to={`/edit/${book.id}`}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => onDelete(book.id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookCard;
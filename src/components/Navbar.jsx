import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?q=${search}`);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#121212",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // 🔥 key change
          alignItems: { xs: "center", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 1 }
        }}
      >
        {/* ✅ Logo (center on mobile) */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            color: "#fff",
            textAlign: { xs: "center", md: "left" },
            width: { xs: "100%", md: "auto" }
          }}
          onClick={() => navigate("/")}
        >
          📚 Book Library App
        </Typography>

        {/* ✅ Search + Actions */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "100%",
            maxWidth: { xs: "100%", md: 420 }
          }}
        >

          {/* 🔤 Input */}
          <TextField
            size="small"
            placeholder="Search..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 1,
              input: { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#444"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#666"
              }
            }}
          />

          {/* 🔍 Search Button (LEFT) */}
          <Button
            type="submit"
            variant="contained"
            size="Medium"
            sx={{
              minWidth: "auto",
              px: 2,
              backgroundColor: "#333",
              "&:hover": { backgroundColor: "#555" }
            }}
          >
            Search
          </Button>

          {/* ➕ Add Button (RIGHT) */}
          <Button
            variant="contained"
            size="Medium"
            sx={{
              minWidth: "auto",
              px: 2,
              backgroundColor: "#2e7d32",
              "&:hover": { backgroundColor: "#1b5e20" }
            }}
            onClick={() => navigate("/add")}
          >
            Add
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
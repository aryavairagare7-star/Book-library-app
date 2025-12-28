import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const handleSearch = (e) => {
  e.preventDefault();
  if (!search.trim()) return;
  navigate(`/?q=${search}`);
};


  return (
    <nav className="navbar navbar-dark bg-dark px-5">
      <Link to="/" className="navbar-brand text-white text-decoration-none">
        Book Library App 📖
      </Link>


      <form className="d-flex" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>

        <button style={{ width: "150px" }} className="btn btn-success ms-2">
          <Link to="/add" className="text-white text-decoration-none">
            Add Book
          </Link>
        </button>
      </form>
    </nav>
  );
}

export default Navbar;

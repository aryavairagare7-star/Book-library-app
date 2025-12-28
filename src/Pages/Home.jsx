import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/BookServices";
import BookCard from "../components/BookCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


function Home({ searchQueryFromNavbar = "" }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  

  // pagination & filters
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [genre, setGenre] = useState("");

const location = useLocation();
const [searchParams] = useSearchParams();
const q = searchParams.get("q") || "";


useEffect(() => {
  setPage(1);
}, [q, genre, sortBy, order]);

useEffect(() => {
  loadBooks();
}, [q, genre, sortBy, order]);

useEffect(() => {
  if (location.state?.message) {
    toast.success(location.state.message);

    // prevent showing again on refresh
    window.history.replaceState({}, document.title);
  }
}, []);

const loadBooks = async () => {
  try {
    setLoading(true);

    const res = await getBooks(); // ⬅ NO params
    let data = res.data;

    // 🔍 SEARCH (frontend)
    if (q) {
      data = data.filter((book) =>
        book.title.toLowerCase().includes(q.toLowerCase()) ||
        book.author.toLowerCase().includes(q.toLowerCase()) ||
        book.genre.toLowerCase().includes(q.toLowerCase())
      );
    }

    // 🎭 GENRE FILTER
    if (genre) {
      data = data.filter((book) => book.genre === genre);
    }

    // 🔃 SORT
    data.sort((a, b) => {
      if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
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
      // if the last item on page was deleted and page > 1, go to previous page
      if (books.length === 1 && page > 1) setPage(page - 1);
      else loadBooks();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // pagination helpers
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Available Books</h3>

        <div className="d-flex gap-2">
          

          <select className="form-select w-auto" value={genre} onChange={(e)=>{ setPage(1); setGenre(e.target.value) }}>
            <option value="">All genres</option>
            <option value="Programming">Programming</option>
            <option value="Self-help">Self-help</option>
            <option value="Fiction">Fiction</option>
            <option value="Informative">Informative</option>
          </select>

          <select className="form-select w-auto" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="row">
          {books.map((b) => (
            <BookCard key={b.id} book={b} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {/* <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <button className="btn btn-outline-secondary" disabled={page === 1} onClick={()=>setPage(1)}>First</button>
        <button className="btn btn-outline-secondary" disabled={page === 1} onClick={()=>setPage(p => Math.max(1, p-1))}>Prev</button>

        <span>Page {page} of {totalPages || 1}</span>

        <button className="btn btn-outline-secondary" disabled={page === totalPages || totalPages===0} onClick={()=>setPage(p => Math.min(totalPages, p+1))}>Next</button>
        <button className="btn btn-outline-secondary" disabled={page === totalPages || totalPages===0} onClick={()=>setPage(totalPages)}>Last</button>
      </div> */}
    </div>
  );
}

export default Home;

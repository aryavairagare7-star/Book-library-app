import { useEffect, useState } from "react";
import { getBook, deleteBook } from "../services/BookServices";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

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
      navigate("/"); // redirect to Home
    } catch {
      toast.error("Failed to delete book");
    }
  };

  if (loading) return <h3 className="mt-5 text-center">Loading...</h3>;
  if (!book) return null;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mt-5">
        <div className="col-4">
          <h2>{book.title}</h2>
          <br />
          <img src={book.image} width="300" alt={book.title} className="mb-3" />
        </div>
        <div className="col mx-4">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Published Date:</strong> {book.published}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <br />
          <div className="d-flex gap-3">
            <Link to={`/edit/${book.id}`} className="btn btn-warning">
            Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default ViewBook;

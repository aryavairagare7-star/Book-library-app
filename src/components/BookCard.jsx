import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book, onDelete }) {
  return (
    <div className="col-md-3 mt-5">
      <div className="card book-card">
        <img src={book.image} className="card-img-top" alt="Book" />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
        </div>

        <div className="card-overlay">
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>

          <Link to={`/book/${book.id}`} className="btn btn-primary btn-sm m-1">
            View
          </Link>
          <Link to={`/edit/${book.id}`} className="btn btn-warning btn-sm m-1">
            Edit
          </Link>
          <button className="btn btn-danger btn-sm m-1" onClick={() => onDelete(book.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;

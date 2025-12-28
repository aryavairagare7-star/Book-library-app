import { useState } from "react";
import { addBook } from "../services/BookServices";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    genre: "",
    published: "",
    description: "",
    pages: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fixedForm = {
      ...form,
      price: form.price.toString(),
      pages: form.pages.toString(),
    };

    await addBook(form);

navigate("/", {
  state: { message: "Book added successfully ✅" }
});

  };

  return (
    <div className="container mt-4">
      <h3>Add Book</h3>
      <form onSubmit={handleSubmit} className="w-50">

        <input className="form-control mt-2" name="title" placeholder="Title" onChange={handleChange} />
        <input className="form-control mt-2" name="author" placeholder="Author" onChange={handleChange} />
        <input className="form-control mt-2" name="genre" placeholder="Genre" onChange={handleChange} />
        <input className="form-control mt-2" name="published" placeholder="Published Date" onChange={handleChange} />
        <input className="form-control mt-2" name="pages" placeholder="Pages" onChange={handleChange} />
        <textarea className="form-control mt-2"   rows={5} name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input className="form-control mt-2" name="price" placeholder="Price" onChange={handleChange} />
        <input className="form-control mt-2" name="image" placeholder="Image URL" onChange={handleChange} />

        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default AddBook;

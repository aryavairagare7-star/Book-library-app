import { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/BookServices";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    getBook(id).then((res) => {
      setForm(res.data); // ✅ populate inputs
    });
  }, [id]);

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

    await updateBook(id, fixedForm);

navigate("/", {
  state: { message: "Book updated successfully" }
});

  };



  return (
    <div className="container mt-4">
      <h3>Edit Book</h3>
      <form onSubmit={handleSubmit} className="w-50">

        <input
          className="form-control mt-2"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          className="form-control mt-2"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
        />

        <input
          className="form-control mt-2"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
        />

        <input
          className="form-control mt-2"
          name="published"
          value={form.published}
          onChange={handleChange}
          placeholder="Published Date"
        />

        <input
          className="form-control mt-2"
          name="pages"
          value={form.pages}
          onChange={handleChange}
          placeholder="Pages"
        />

        <textarea
          className="form-control mt-2"
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          className="form-control mt-2"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          className="form-control mt-2"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <button className="btn btn-primary mt-3">Update</button>
      </form>
    </div>
  );
}

export default EditBook;

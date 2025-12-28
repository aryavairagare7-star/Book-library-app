import axios from "axios";
const API = "https://695178c370e1605a108a282a.mockapi.io/books";

export const getBooks = (params = {}) => axios.get(API, { params });
// params e.g. { _page: 1, _limit: 6, q: "search", _sort: "price", _order: "asc", author: "..." }

export const getBook = (id) => axios.get(`${API}/${id}`);
export const addBook = (data) => axios.post(API, data);
export const updateBook = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API}/${id}`);

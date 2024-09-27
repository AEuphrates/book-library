import React, { useState, useEffect } from "react";
import {
  getBooks,
  createBook,
  deleteBook,
  getAuthors,
  getCategories,
  getPublishers,
} from "../services/apiService";
import Modal from "react-modal";
import "../modal-style.css";

Modal.setAppElement("#root");

function BookList() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [publishers, setPublishers] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [selectedPublisherId, setSelectedPublisherId] = useState("");
  const [newBookName, setNewBookName] = useState("");
  const [stock, setStock] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
    fetchPublishers();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  const fetchAuthors = async () => {
    const fetchedAuthors = await getAuthors();
    setAuthors(fetchedAuthors);
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const fetchPublishers = async () => {
    const fetchedPublishers = await getPublishers();
    setPublishers(fetchedPublishers);
  };

  const handleCategoryChange = (categoryId) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(categoryId)) {
      newSelectedCategories.delete(categoryId);
    } else {
      newSelectedCategories.add(categoryId);
    }
    setSelectedCategories(newSelectedCategories);
  };

  const handleAdd = async () => {
    if (!newBookName.trim()) {
      setModalContent("Kitap ismi boş bırakılamaz!");
      setModalIsOpen(true);
      return;
    }
    if (
      !selectedAuthorId ||
      !selectedPublisherId ||
      selectedCategories.size === 0
    ) {
      setModalContent("Lütfen tüm alanları doldurun!");
      setModalIsOpen(true);
      return;
    }
    if (books.some((b) => b.name.toLowerCase() === newBookName.toLowerCase())) {
      setModalContent("Bu kitap zaten var!");
      setModalIsOpen(true);
      return;
    }

    try {
      const newBook = {
        name: newBookName,
        author: { id: selectedAuthorId },
        categories: Array.from(selectedCategories).map((id) => ({ id })),
        publisher: { id: selectedPublisherId },
        stock: Number(stock),
      };
      await createBook(newBook);
      setNewBookName("");
      setSelectedAuthorId("");
      setSelectedCategories(new Set());
      setSelectedPublisherId("");
      setStock(1);
      fetchBooks();
    } catch (error) {
      setModalContent("Kitap eklenirken bir hata oluştu: " + error.message);
      setModalIsOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      setModalContent("Kitap silinirken bir hata oluştu: " + error.message);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Kitaplar</h1>
      <input
        value={newBookName}
        onChange={(e) => setNewBookName(e.target.value)}
        placeholder="Kitap ismi girin"
      />
      <select
        value={selectedAuthorId}
        onChange={(e) => setSelectedAuthorId(e.target.value)}
      >
        <option value="">Yazar Seçin</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              checked={selectedCategories.has(category.id)}
              onChange={() => handleCategoryChange(category.id)}
            />
            {category.name}
          </div>
        ))}
      </div>
      <select
        value={selectedPublisherId}
        onChange={(e) => setSelectedPublisherId(e.target.value)}
      >
        <option value="">Yayınevi Seçin</option>
        {publishers.map((publisher) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        min="0"
        placeholder="Stok Miktarı"
      />
      <button onClick={handleAdd}>Yeni Kitap Ekle</button>
      {books.map((book) => (
        <div key={book.id}>
          {book.name} - Yazar: {book.author?.name || "Bilinmiyor"} - Kategori:
          {book.categories.map((cat) => cat.name).join(", ") || "Bilinmiyor"} -
          Yayınevi:
          {book.publisher?.name || "Bilinmiyor"} - Stok:
          {book.stock > 0 ? book.stock : "Stok yok"}
          <button onClick={() => handleDelete(book.id)}>Sil</button>
        </div>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Uyarı"
        className="modal"
        overlayClassName="overlay"
      >
        <div>
          <h2>Uyarı</h2>
          <p>{modalContent}</p>
          <button onClick={closeModal}>Kapat</button>
        </div>
      </Modal>
    </div>
  );
}

export default BookList;

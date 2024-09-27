import React, { useState, useEffect } from "react";
import { getBooks } from "../services/apiService";
import Modal from "react-modal";

function PurchaseList() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  const addToCart = () => {
    if (!selectedBookId) {
      showModal("Lütfen bir kitap seçin!");
      return;
    }
    if (quantity < 1) {
      showModal("Lütfen geçerli bir miktar girin!");
      return;
    }

    const book = books.find((book) => book.id === Number(selectedBookId));
    if (!book) {
      showModal("Seçilen kitap bulunamadı.");
      return;
    }

    if (book.stock < quantity) {
      showModal("Yeterli stok yok.");
      return;
    }

    const existingItem = cart.find(
      (item) => item.id === Number(selectedBookId)
    );
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === Number(selectedBookId)
            ? { ...item, quantity: item.quantity + Number(quantity) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: Number(quantity) }]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((item) => item.id !== bookId));
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      showModal("Lütfen sepetinize kitap ekleyin.");
      return;
    }

    
    showModal("Satın alma işlemi tamamlandı.");
    setCart([]); 
    fetchBooks(); 
  };

  const showModal = (message) => {
    setModalContent(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Satın Alınanlar</h1>
      <div>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="">Kitap Seçin</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          placeholder="Miktar"
        />
        <button onClick={addToCart}>Kitap Ekle</button>
      </div>
      {cart.length > 0 && (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Miktar: {item.quantity}
              <button onClick={() => removeFromCart(item.id)}>Sil</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePurchase} style={{ marginTop: "20px" }}>
        Satın Al
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <p>{modalContent}</p>
        <button onClick={closeModal}>Kapat</button>
      </Modal>
    </div>
  );
}

export default PurchaseList;

import React, { useState, useEffect } from "react";
import { getBooks } from "../services/apiService"; 
import "../Home.css"; 
function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Kitaplar yüklenirken hata oluştu:", error);
    }
  };

  const renderStockInfo = (stock) => {
    return stock === 0 ? "Stok yok" : stock;
  };

  return (
    <div className="home-container">
      <h1>Hoşgeldiniz!</h1>
      <p>Burası ana sayfadır, sitemizi keşfetmeye başlayabilirsiniz.</p>

      <h2>Mevcut Kitaplar</h2>
      {books.length > 0 ? (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <strong>Kitap İsmi:</strong> {book.name} <br />
              <strong>Yazar:</strong> {book.author?.name || "Bilinmiyor"} <br />
              <strong>Yayınevi:</strong> {book.publisher?.name || "Bilinmiyor"}{" "}
              <br />
              <strong>Kategori:</strong>{" "}
              {book.categories?.[0]?.name || "Bilinmiyor"} <br />
              <strong>Stok:</strong> {renderStockInfo(book.stock)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz eklenmiş kitap yok.</p>
      )}
    </div>
  );
}

export default Home;

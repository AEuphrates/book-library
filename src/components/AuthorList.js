import React, { useState, useEffect } from "react";
import { getAuthors, createAuthor, deleteAuthor } from "../services/apiService";
import Modal from "react-modal";
import "../modal-style.css";


Modal.setAppElement("#root");

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const fetchedAuthors = await getAuthors();
    setAuthors(fetchedAuthors);
  };

  const handleAdd = async () => {
    if (!newAuthorName.trim()) {
      openModal("Yazar ismi boş bırakılamaz!");
      return;
    }
    if (
      authors.some((a) => a.name.toLowerCase() === newAuthorName.toLowerCase())
    ) {
      openModal("Bu yazar zaten var!");
      return;
    }
    try {
      const newAuthor = {
        name: newAuthorName,
        birthDate: "2024-09-24",
        country: "string",
      };
      await createAuthor(newAuthor);
      setNewAuthorName("");
      fetchAuthors();
    } catch (error) {
      openModal("Yazar eklenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
    } catch (error) {
      openModal("Yazar silinirken bir hata oluştu.");
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Yazarlar</h1>
      <input
        value={newAuthorName}
        onChange={(e) => setNewAuthorName(e.target.value)}
        placeholder="Yazar ismi girin"
      />
      <button onClick={handleAdd}>Yeni Yazar Ekle</button>
      {authors.map((author) => (
        <div key={author.id}>
          {author.name}
          <button onClick={() => handleDelete(author.id)}>Sil</button>
        </div>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Hata Mesajı"
      >
        <h2>Hata</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal}>Kapat</button>
      </Modal>
    </div>
  );
}

export default AuthorList;

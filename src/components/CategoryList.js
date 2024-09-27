import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../services/apiService";
import Modal from "react-modal";


Modal.setAppElement("#root");

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const handleAdd = async () => {
    if (!newCategoryName.trim()) {
      setModalContent("Kategori ismi boş bırakılamaz!");
      setModalIsOpen(true);
      return;
    }
    if (categories.some((cat) => cat.name === newCategoryName)) {
      setModalContent("Bu kategori zaten var!");
      setModalIsOpen(true);
      return;
    }
    const newCategory = { name: newCategoryName, description: "Açıklama" };
    await createCategory(newCategory);
    setNewCategoryName("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Kategoriler</h1>
      <input
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Kategori ismi girin"
      />
      <button onClick={handleAdd}>Yeni Kategori Ekle</button>
      {categories.map((category) => (
        <div key={category.id}>
          {category.name}
          <button onClick={() => handleDelete(category.id)}>Sil</button>
        </div>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Hata Mesajı"
      >
        <h2>Hata</h2>
        <p>{modalContent}</p>
        <button onClick={closeModal}>Kapat</button>
      </Modal>
    </div>
  );
}

export default CategoryList;

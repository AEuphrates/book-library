import React, { useState, useEffect } from "react";
import {
  getPublishers,
  createPublisher,
  deletePublisher,
} from "../services/apiService";
import Modal from "react-modal";

Modal.setAppElement("#root");

function PublisherList() {
  const [publishers, setPublishers] = useState([]);
  const [newPublisherName, setNewPublisherName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const fetchedPublishers = await getPublishers();
      setPublishers(fetchedPublishers);
    } catch (error) {
      console.error("Publishers fetching failed:", error);
      setModalContent("Publishers fetching failed");
      setModalIsOpen(true);
    }
  };

  const handleAdd = async () => {
    if (!newPublisherName.trim()) {
      setModalContent("Yayınevi ismi boş olamaz");
      setModalIsOpen(true);
      return;
    }
    if (
      publishers.some(
        (p) => p.name.toLowerCase() === newPublisherName.toLowerCase()
      )
    ) {
      setModalContent("Bu yayınevi zaten mevcut");
      setModalIsOpen(true);
      return;
    }
    const newPublisher = {
      name: newPublisherName,
      establishmentYear: "0",
      address: "string",
    };

    try {
      await createPublisher(newPublisher);
      setNewPublisherName("");
      fetchPublishers();
    } catch (error) {
      console.error("Error adding publisher:", error);
      setModalContent(
        "An error occurred while adding the publisher: " + error.message
      );
      setModalIsOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePublisher(id);
      fetchPublishers();
    } catch (error) {
      console.error("Error deleting publisher:", error);
      setModalContent(
        "An error occurred while deleting the publisher: " + error.message
      );
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Yayınevi</h1>
      <input
        value={newPublisherName}
        onChange={(e) => setNewPublisherName(e.target.value)}
        placeholder="Yayın evi ekleyin"
      />
      <button onClick={handleAdd}>Yeni yayınevi ekleyin</button>
      {publishers.length > 0 ? (
        <ul>
          {publishers.map((publisher) => (
            <li key={publisher.id}>
              {publisher.name}
              <button onClick={() => handleDelete(publisher.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No publishers found.</p>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <h2>Error</h2>
        <p>{modalContent}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default PublisherList;

import axios from "axios";

const BASE_URL = "https://historical-loon-euphrates-6f4798fe.koyeb.app"; 


const getPublishers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/publishers`);
    return response.data;
  } catch (error) {
    console.error("Yayımcıları alırken hata oluştu:", error);
    throw error;
  }
};


const createPublisher = async (publisher) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/publishers`,
      publisher
    );
    return response.data;
  } catch (error) {
    console.error("Yayımcı eklerken hata oluştu:", error);
    throw error;
  }
};
const updatePublisher = async (id, updatedPublisher) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/categories/${id}`,
      updatedPublisher
    );
    return response.data;
  } catch (error) {
    console.error("Kategori güncellenirken hata oluştu:", error);
    throw error;
  }
};

const deletePublisher = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/publishers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Yayımcı silinirken hata oluştu:", error);
    throw error;
  }
};


const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/categories`);
    return response.data;
  } catch (error) {
    console.error("Kategorileri alırken hata oluştu:", error);
    throw error;
  }
};


const createCategory = async (category) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/categories`,
      category
    );
    return response.data;
  } catch (error) {
    console.error("Kategori eklerken hata oluştu:", error);
    throw error;
  }
};


const updateCategory = async (id, updatedCategory) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/categories/${id}`,
      updatedCategory
    );
    return response.data;
  } catch (error) {
    console.error("Kategori güncellenirken hata oluştu:", error);
    throw error;
  }
};


const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Kategori silinirken hata oluştu:", error);
    throw error;
  }
};
const getBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/books`);
    return response.data;
  } catch (error) {
    console.error("Kitapları alırken hata oluştu:", error);
    throw error;
  }
};


const createBook = async (book) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/books`, book);
    return response.data;
  } catch (error) {
    console.error("Kitap eklerken hata oluştu:", error);
    throw error;
  }
};


const updateBook = async (id, updatedBook) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/books/${id}`,
      updatedBook
    );
    return response.data;
  } catch (error) {
    console.error("Kitap güncellenirken hata oluştu:", error);
    throw error;
  }
};


const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Kitap silinirken hata oluştu:", error);
    throw error;
  }
};

const getAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/authors`);
    return response.data;
  } catch (error) {
    console.error("Yazarları alırken hata oluştu:", error);
    throw error;
  }
};


const createAuthor = async (author) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/authors`, author);
    return response.data;
  } catch (error) {
    console.error("Yazar eklerken hata oluştu:", error);
    throw error;
  }
};


const updateAuthor = async (id, updatedAuthor) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/authors/${id}`,
      updatedAuthor
    );
    return response.data;
  } catch (error) {
    console.error("Yazar güncellenirken hata oluştu:", error);
    throw error;
  }
};


const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/authors/${id}`);
    return response.data;
  } catch (error) {
    console.error("Yazar silinirken hata oluştu:", error);
    throw error;
  }
};
const getPurchases = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/purchases`);
    return response.data;
  } catch (error) {
    console.error("Yazarları alırken hata oluştu:", error);
    throw error;
  }
};


const createPurchase = async (purchase) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/purchases`, purchase);
    return response.data;
  } catch (error) {
    console.error("Yazar eklerken hata oluştu:", error);
    throw error;
  }
};


const updatePurchase = async (id, updatedPurchase) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/purchases/${id}`,
      updatedPurchase
    );
    return response.data;
  } catch (error) {
    console.error("Yazar güncellenirken hata oluştu:", error);
    throw error;
  }
};


const deletePurchase = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/purchases/${id}`);
    return response.data;
  } catch (error) {
    console.error("Yazar silinirken hata oluştu:", error);
    throw error;
  }
};

const updateBookStock = async (id, stock) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/books/${id}/stock`, {
      stock,
    });
    return response.data;
  } catch (error) {
    console.error("Updating book stock failed:", error);
    throw error;
  }
};

export {
  getPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBooks,
  createBook,
  updateBook,
  updateBookStock,
  deleteBook,
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
};

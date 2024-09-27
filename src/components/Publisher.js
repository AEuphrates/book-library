import React, { useEffect, useState } from "react";
import { getPublishers } from "../services/apiService"; 
function Publisher() {
  const [publishers, setPublihers] = useState([]); 

  useEffect(() => {
    const fetchPublihers = async () => {
      try {
        const fetchedCategories = await getPublishers(); 
        setPublihers(fetchedCategories); 
      } catch (error) {
        console.error("Kategorileri yüklerken bir hata oluştu", error);
      }
    };

    fetchPublihers();
  }, []);

  return (
    <div>
      <h1>Kategori</h1>
      <ul>
        {publishers.map(
          (
            Publisher 
          ) => (
            <li key={Publisher.id}>{Publisher.name}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default Publisher;

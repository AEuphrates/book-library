import React, { useEffect, useState } from "react";
import { getCategories } from "../services/apiService"; 

function Category() {
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories(); 
        setCategories(fetchedCategories); 
      } catch (error) {
        console.error("Kategorileri yüklerken bir hata oluştu", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Kategori</h1>
      <ul>
        {categories.map(
          (
            category 
          ) => (
            <li key={category.id}>{category.name}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default Category;

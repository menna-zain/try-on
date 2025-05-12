import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categoryId, setCategoryID] = useState(null);
  const [subCategories, setSubCategories] = useState([]);


  return (
    <CategoryContext.Provider
      value={{
        categoryId,
        setCategoryID,
        subCategories,
        setSubCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

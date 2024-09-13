import { createContext, useState, useEffect } from "react";
import { fetchFirstBatch, fetchNextBatch } from "../fetchLogic";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFirstBatch().then((data) => {
      setProducts(data);
    });
  }, []);

  function loadMore() {
    fetchNextBatch().then((data) => {
      if (data) setProducts((prevProducts) => [...prevProducts, ...data]);
      else console.log("No More Items Available");
    });
  }
  
  return (
    <ProductContext.Provider value={{ products, setProducts, loadMore }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

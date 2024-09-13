import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorieBar from "../../components/CategorieBar";
import ProductCard from "../../components/ProductCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../../contexts/AuthContext";

function MyFavorite() {
  const [products, setProducts] = useState([]);
  const { userFavorites } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProductsByIds() {
      const q = query(
        collection(db, "products"),
        where("__name__", "in", userFavorites)
      );
      const querySnapshot = await getDocs(q);
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productsArray);
    }
    if (userFavorites.length > 0) fetchProductsByIds();
  }, [userFavorites]);

  return (
    <>
      <CategorieBar />
      <div className="min-h-[60vh] w-[1280px] mx-auto">
        <nav className="p-4">
          <div className="flex gap-3 text-sm text-[#012F34] border-b p-4 w-fit">
            <Link to="../myads">ADS</Link>
            <Link to="../myfavorites">FAVORITES</Link>
            <hr />
          </div>
        </nav>

        <div className="min-h-[32vh] box-border max-w-[1280px] mx-auto w-100 mt-4">
          <div>
            {products.map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFavorite;

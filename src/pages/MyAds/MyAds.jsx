import React, { useState, useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import CategorieBar from "../../components/CategorieBar";
import { AuthContext } from "../../contexts/AuthContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function MyAds() {
  const [products, setProducts] = useState([]);
  const { userAds, userFavorites } = useContext(AuthContext);

  useEffect(() => {
    console.log(userFavorites);
    async function fetchProductsByIds() {
      const q = query(
        collection(db, "products"),
        where("__name__", "in", userAds)
      );
      const querySnapshot = await getDocs(q);
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productsArray);
    }

    if (userAds.length > 0) {
      fetchProductsByIds();
    }
  }, [userAds]);

  return (
    <>
      <CategorieBar />
      <div className="min-h-[60vh] w-[1280px] mx-auto">
        <nav className="pt-4">
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

export default MyAds;

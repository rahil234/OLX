import React, { useContext } from "react";
import ProductCard from "../../components/ProductCard";
import CategorieBar from "../../components/CategorieBar";
import { ProductContext } from "../../contexts/ProductContext";
import "./Home.css";

function Home() {
  const { products, loadMore } = useContext(ProductContext);

  return (
    <div className="relative">
      <CategorieBar />
      <div>
        <div className="min-h-[32vh] box-border max-w-[1280px] mx-auto w-100 mt-4">
          <span className="text-xl ms-[8px]">Fresh recommendations</span>
          <div>
            {products.map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}
          </div>
        </div>
        <div className="w-100 flex justify-center my-10">
          <button
            className=" p-2 m-auto text-center border-2 border-emerald-950 rounded hover:outline"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

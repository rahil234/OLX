import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { AuthContext } from "../contexts/AuthContext";

function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(product?.price);
  const [isFavorite, setIsFavorite] = useState(false);
  const {toggleFavorite} = useContext(AuthContext);

  const handleToggle = async () => {
    await toggleFavorite(product?.id);
    setIsFavorite((prevValue) => !prevValue);
  };

  return (
    <div className="product-card inline-block relative border rounded">
      <Link to={`/product/${product?.id}`} className="flex flex-col">
        <figure className="product-image">
          <img
            src={product.images[0]}
            alt={product?.title}
            sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 960px) 25vw, (min-width: 540px) 25vw, (min-width: 320px) 30vw, 35vw"
          />
        </figure>
        <div className="product-details text-[#617A7E]">
          <span className="price text-emerald-950 font-bold">{`₹ ${formattedPrice}`}</span>{" "}
          <br />
          <span className="details text-emerald-950">
            {product?.details}
          </span>{" "}
          <br />
          <span className="title">{product?.title}</span>
          <div>
            <span className="place">{product?.place}</span>
            <span className="posted-date">{product?.dateAdded}</span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        role="button"
        tabIndex="0"
        data-aut-id="btnFav"
        title="Favourite"
        className="rounded-full bg-white absolute top-3 right-3 p-1"
        onClick={handleToggle}
      >
        {isFavorite ? (
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            fillRule="evenodd"
          >
            <path d="M705.941 124.121c-80.853 0-152.204 41.445-193.939 104.204-41.736-62.759-113.086-104.204-193.939-104.204-128.33 0-232.727 104.398-232.727 232.727 0 50.657 16.194 98.967 47.806 140.916l328.766 402.114h100.189l329.716-403.355c30.662-40.708 46.856-89.018 46.856-139.675 0-128.33-104.398-232.727-232.727-232.727z"></path>
          </svg>
        ) : (
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            fillRule="evenodd"
          >
            <path
              className="bg-black"
              d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
}

export default ProductCard;

import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

const ProductPage = () => {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const product = products?.find((p) => p.id === id);

  const formattedPrice = (value) =>
    "₹ " + new Intl.NumberFormat("en-IN").format(value);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (product?.images.length) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product?.images.length);
    }
  };

  const handlePrev = () => {
    if (product?.images) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + product?.images.length) % product?.images.length
      );
    }
  };

  return (
    <>
      {product ? (
        <div className="product-detail py-10 bg-[#F1F4F5]">
          <div className=" w-[1280px] mx-auto flex gap-3">
            <div className="relative overflow-hidden w-2/3">
              <div className="rounded overflow-hidden mb-2">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-[480px] bg-black"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {product.images.map((image, index) => (
                    <div
                      className="w-full flex-shrink-0 flex justify-center"
                      key={index}
                    >
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-[#00000065] rounded-full p-2"
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fill="white"
                    fillRule="evenodd"
                  >
                    <path d="M684.685 85.333l-407.352 396.501v60.331l407.352 396.501h61.982v-60.331l-376.339-366.336 376.339-366.336v-60.331z"></path>
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-[#00000065] rounded-full p-2"
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fill="white"
                    fillRule="evenodd"
                  >
                    <path d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path>
                  </svg>
                </button>
              </div>

              <div className="bg-white border border-gray-300 rounded p-4 mb-6 text-[#012F34]">
                <div>
                  <h3 className="text-xl font-bold">Details</h3>
                  <span>
                    {product?.title}
                  </span>
                </div>
                <hr />
                <div className="pt-3 ">
                  <h3 className="text-xl font-bold">Description</h3>
                  <span>
                    {product?.description}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-[33.333%] text-[#012F34]">
              <div className="bg-white border border-gray-300 rounded p-4 mb-2">
                <div className="flex justify-between mb-2">
                  <h1 className="text-4xl font-bold">
                    {formattedPrice(product?.price)}
                  </h1>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      role="button"
                      tabIndex="0"
                      data-aut-id="btnShare"
                      title="Share"
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 1024 1024"
                        data-aut-id="icon"
                        fillRule="evenodd"
                      >
                        <path d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      role="button"
                      tabIndex="0"
                      data-aut-id="btnFav"
                      title="Favourite"
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 1024 1024"
                        data-aut-id="icon"
                        fillRule="evenodd"
                      >
                        <path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <span>{product?.title}</span>
                <div className="flex justify-between mt-5 text-xs">
                  <span>
                    {`${product.location.city}, ${product.location.state}, India`}
                  </span>
                  <span>{product.title}</span>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded p-4 mb-6">
                <div className="flex items-center justify-between h-[80px]">
                  <div>
                    <img
                      src="https://statics.olx.in/external/base/img/avatar_4.png"
                      alt=""
                      className="h-[70px] object-contain"
                    />
                    <h3>{product?.sellerName}</h3>
                  </div>
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fillRule="evenodd"
                  >
                    <path d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path>
                  </svg>
                </div>
                <button className="w-full h-[48px] border-2 border-[#012F34] rounded outline outline-1 hover:outline-2 out">
                  Chat with seller
                </button>
              </div>
              <div className="bg-white border border-gray-300 rounded p-4">
                <h3 className="text-xl font-bold mb-4">Posted in</h3>
                <span className="text-xs">
                  {`${product.location.city}, ${product.location.state}, India`}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span>AD ID {product.id}</span>
                <span>REPORT THIS AD</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </>
  );
};

export default ProductPage;

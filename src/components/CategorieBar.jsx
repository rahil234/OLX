import React from "react";

function CategorieBar() {
  return (
    <div className="catagories-div">
      <div className="flex max-w-[1280px] h-[44px] items-center mx-auto m-100">
        <div className="me-[16px] flex">
          <span className="text-sm font-medium me-3">ALL CATOGORIES</span>
          <button className="relative -top-[3px]">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              fillRule="evenodd"
            >
              <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
            </svg>
          </button>
        </div>
        <div className="catogory-items">
          <div>
            <a href=""> Cars</a>
          </div>
          <div>
            <a href=""> Motorcycles</a>
          </div>
          <div>
            <a href=""> Mobile Phones</a>
          </div>
          <div>
            <a href=""> For Sale: Houses & Apartments</a>
          </div>
          <div>
            <a href=""> Scooters</a>
          </div>
          <div>
            <a href=""> Commercial & Other Vehicles</a>
          </div>
          <div>
            <a href=""> For Rent: Houses & Apartments</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorieBar;
import React, { useContext, useState } from "react";
import "./Nav.css";
import { AuthContext } from "../../contexts/AuthContext";
import LoginOverlay from "../LoginOverlay";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

function Nav() {
  let navigate = useNavigate();
  const { user, logout, setIsVisible } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };
  const handleMyAds = () => {
    navigate("/MyAds");
    setShowProfileMenu(false);
  };
  const toogleShowProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  const handleSell = () => {
    if (user) {
      return navigate("/post");
    }
    setIsVisible(true);
  };

  return (
    <>
      <LoginOverlay />
      <div className="nav-container fixed top-0 flex justify-between items-center  w-screen z-40">
        <a href="/">
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 1024 1024"
            fillRule="evenodd"
            fill="#002f34"
          >
            <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
          </svg>
        </a>

        <div className="input-div mx-[16px] flex flex-grow">
          <div className="country-div bg-white flex justify-between items-center border-2 px-2 border-emerald-950 rounded border-box w-[272px]">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              fillRule="evenodd"
            >
              <path d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path>
            </svg>
            <input
              className="country-input-field active:border-0 bg-white ps-3"
              placeholder="Search city, area or locality"
              value="India"
              readOnly
              disabled
            />
            <span>
              <button type="button">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                  fillRule="evenodd"
                >
                  <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
                </svg>
              </button>
            </span>
          </div>

          <div className="search-div flex flex-grow border-2 border-emerald-950 ms-5 rounded">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
              className="search-field p-3 w-full outline-none placeholder:font-normal"
            />
            <button className="bg-emerald-950 fill-white p-2 px-3">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
                fillRule="evenodd"
              >
                <path d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="language-div flex items-center">
          <span className="me-2 font-semibold text-[14px]">ENGLISH</span>
          <button
            type="button"
            role="button"
            tabIndex="0"
            data-aut-id=""
            title=""
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              fillRule="evenodd"
            >
              <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
            </svg>
          </button>
        </div>

        <div className="button-div flex">
          {user ? (
            <div
              data-aut-id="actionButtons"
              className="relative flex justify-center items-center gap-6 mx-6"
            >
              <a rel="nofollow" data-aut-id="btnChat" href="/nf/chat">
                <button
                  type="button"
                  role="button"
                  tabIndex="0"
                  data-aut-id=""
                  title="chat"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fillRule="evenodd"
                  >
                    <path d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333zM147.093 938.667l-61.76-38.368v-428.929c0-212.856 172.267-386.036 384-386.036h85.333c211.733 0 384 173.18 384 386.036s-172.267 386.036-384 386.036h-245.931l-161.643 81.261z"></path>
                  </svg>
                </button>
              </a>
              <div data-aut-id="notificationHub">
                <div data-aut-id="notificationContainer">
                  <button
                    type="button"
                    role="button"
                    tabIndex="0"
                    data-aut-id="badge"
                    title="notifications"
                  >
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 1024 1024"
                      data-aut-id="icon"
                      fillRule="evenodd"
                    >
                      <path d="M730.855 763.955h-435.559c-0.833-87.945-2.676-279.627-2.676-289.496 0-119.351 98.911-216.463 220.498-216.463s220.455 97.112 220.455 216.463c0 10-1.843 201.594-2.72 289.496v0zM819.282 748.603c0.92-93.341 2.062-266.38 2.062-274.144 0-141.589-98.692-260.545-231.64-294.319 2.192-7.237 3.684-14.782 3.684-22.765 0-44.345-35.969-80.27-80.27-80.27-44.345 0-80.27 35.923-80.27 80.27 0 7.983 1.491 15.483 3.684 22.765-132.948 33.731-231.64 152.687-231.64 294.319 0 7.721 1.14 182.339 2.019 276.030l-90.27 36.581 0.92 64.609h316.032c3.729 40.881 37.679 73.031 79.523 73.031s75.794-32.151 79.523-73.031h312.962l1.754-64.523-88.078-38.556z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className="flex items-center mx-auto"
                onClick={toogleShowProfileMenu}
              >
                <figure
                  style={{
                    width: "35px",
                    height: "35px",
                    zIndex: "100",
                    backgroundSize: "cover",
                    backgroundImage:
                      'url("https://statics.olx.in/external/base/img/avatar_2.png")',
                  }}
                ></figure>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                  fillRule="evenodd"
                >
                  <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
                </svg>
              </div>
              {showProfileMenu && (
                <ProfileMenu
                  handleLogout={handleLogout}
                  handleMyAds={handleMyAds}
                />
              )}
            </div>
          ) : (
            <button className="ms-6 me-3" onClick={() => setIsVisible(true)}>
              <span className="border-black border-b-2 font-bold ">Login</span>
            </button>
          )}

          <div className="w-28">
            <button className="relative" onClick={handleSell}>
              <svg width="104" height="48" viewBox="0 0 1603 768">
                <g>
                  <path
                    fill="white"
                    d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"
                  ></path>
                  <path
                    fill="#FECE32"
                    d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"
                  ></path>
                  <path
                    fill="#22E5DB"
                    d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"
                  ></path>
                  <path
                    fill="#3A77FE"
                    d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"
                  ></path>
                </g>
              </svg>
              <div className="absolute flex left-5 top-4">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                  fillRule="evenodd"
                >
                  <path d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"></path>
                </svg>
                <span
                  className="from-neutral-800 ms-2"
                  style={{
                    lineHeight: "1.15",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  SELL
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;

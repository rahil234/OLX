// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import MyAds from "./pages/MyAds";
import MyFavorite from "./pages/MyFavorite";
import PostPage from "./pages/PostPage";
import ProductPage from "./pages/ProductPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import Navbar from "./components/Nav/Nav";
import Footer from "./components/Footer";
import Test from "./pages/Test";
import PrivateRoute from "./utils/PrivateRoute";

const Layout = () => {
  const location = useLocation();
  const excludedRoutes = ["/post", "/edit-profile"];
  const hideNavbarAndFooter = excludedRoutes.includes(location.pathname);

  return (
    <div>
      {!hideNavbarAndFooter && <Navbar />}
      <main className="mt-[72px]">
        <Outlet />
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route
                path="/myads"
                element={<PrivateRoute element={<MyAds />}></PrivateRoute>}
              />
              <Route
                path="/myfavorites"
                element={<PrivateRoute element={<MyFavorite />}></PrivateRoute>}
              />
            </Route>
            <Route path="/test" element={<Test />}></Route>

            <Route
              path="/post"
              element={<PrivateRoute element={<PostPage />} />}
            />
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;

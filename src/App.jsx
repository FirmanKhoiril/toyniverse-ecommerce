import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from 'sonner';
import { Sidebar, Navbar, Footer } from "./components";
import "./App.css";
import { useEffect } from "react";

function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="font-nunito ">
      <Toaster position="top-center" theme="light" richColors />
      {pathname !== "/register" && pathname !== "/login" && <Navbar />}
      <Outlet />
      <Sidebar />
      {pathname !== "/register" && pathname !== "/login" && <Footer />}
    </main>
  );
}

export default App;

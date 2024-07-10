import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
//siempre que queras que los toast se vean tenes que usar el toast container
const AppLayout = () => {
  const { data, isError, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="auth/login" />;
  }
  if (data)
    return (
      <>
        <Header />
        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          {" "}
          <Outlet />
        </section>

        <Footer />
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
};

export default AppLayout;

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/api/ProjectApi";
const DashboardView = () => {
  //aca estas destructurando datos de useQuery
  const { data, isLoading } = useQuery({
    //el querykey debe ser unico, literalmente no lo podes repetir ni en otro componente
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  if (isLoading) return "Cargando...";
  return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y administra tus proyectos
      </p>
      <div className="my-5">
        <Link
          to={"/projects/create"}
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors cursor-pointer"
        >
          Nuevo proyecto
        </Link>
      </div>
    </>
  );
};

export default DashboardView;

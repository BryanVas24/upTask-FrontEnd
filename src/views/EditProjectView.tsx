import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneProject } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
const EditProjectView = () => {
  //sirve para obtener datos de la url
  const params = useParams();
  //el signo al final le indica que siempre tendra el tipo de dato, no puede ser undefinded
  const projectId = params.projectId!;

  const { data, error, isLoading } = useQuery({
    //acá asignas dos query keys porque recorda que debe se runico
    queryKey: ["editProject", projectId],
    queryFn: () => getOneProject(projectId),
    //son las veces que intentara hacer el llamado
    retry: false,
  });
  //si esta cargando
  if (isLoading) return <div>Buscando proyecto...</div>;
  //si ocurre un error
  if (error)
    return (
      <div className="text-center">
        <h2 className="font-bold text-red-600 text-2xl">
          Error al obtener el proyecto :(
        </h2>{" "}
        <br />
        <p>{(error as Error).message}</p> <br />
        <Link
          to={"/"}
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors cursor-pointer"
        >
          Volver a inicio
        </Link>
      </div>
    );

  console.log(data);
  //si data existe retorna este componente
  if (data) return <EditProjectForm />;
};

export default EditProjectView;

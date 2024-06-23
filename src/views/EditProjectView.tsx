import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneProject } from "@/api/ProjectApi";
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
  if (isLoading) return <div>Buscando proyecto...</div>;
  if (error)
    return (
      <div className="text-center">
        <h2 className="font-bold text-red-600 text-2xl">
          Error al obtener el proyecto :(
        </h2>{" "}
        {(error as Error).message}
      </div>
    );

  console.log(data);
  return <div>pipip</div>;
};

export default EditProjectView;

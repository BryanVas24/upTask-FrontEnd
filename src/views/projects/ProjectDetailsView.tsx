import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneProject } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import { useMemo } from "react";

const ProjectDetailsView = () => {
  const { data: user, isLoading: loading } = useAuth();
  const navigate = useNavigate();
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
  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  //si esta cargando
  if (isLoading && loading) return <div>Buscando proyecto...</div>;
  //si ocurre un error
  if (error) return <Navigate to={"/404"} />;
  //si data existe retorna este componente
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>

        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              onClick={() => navigate(location.pathname + "?newTask=true")}
              className="bg-purple-400 hover:bg-purple-500 px-5 py-5 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Agregar tarea
            </button>
            <Link
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-5 text-white text-xl font-bold cursor-pointer transition-colors"
              to={`/projects/${projectId}/team`}
            >
              Ver colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />

        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};

export default ProjectDetailsView;

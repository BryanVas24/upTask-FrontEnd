import { getTaskByID } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  //extrayendo el id del proyecto
  const params = useParams();
  const projectId = params.projectId!;
  //tomadno el id de la url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskByID({ projectId, taskId }),
    //esto funciona en base a una condición solo retorna boleans y los !! son para convertirlos a boolean
    enabled: !!taskId,
  });

  if (isError) return <Navigate to={"/404"} />;
  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}

import { getTaskByID } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export default function EditTaskData() {
  //extrayendo el id del proyecto
  const params = useParams();
  const projectId = params.projectId!;
  //tomadno el id de la url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const { data } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskByID({ projectId, taskId }),
  });

  console.log(data);
  return <div></div>;
}

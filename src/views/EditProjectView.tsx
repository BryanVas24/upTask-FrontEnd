import { useParams } from "react-router-dom";

const EditProjectView = () => {
  //sirve para obtener datos de la url
  const params = useParams();
  //el signo al final le indica que siempre tendra el tipo de dato, no puede ser undefinded
  const projectId = params.projectId!;
  console.log(projectId);
  return <div></div>;
};

export default EditProjectView;

import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProjectTeamView = () => {
  const navigate = useNavigate();
  //extrayendo el id del proyecto
  const params = useParams();
  const projectId = params.projectId!;
  return (
    <div>
      <h1 className="text-5xl font-black">Administrar equipo</h1>

      <p className="text-2xl font-light text-gray-500 mt-5">
        Administra los miembros del equipo para este trabajo
      </p>
      <nav className="my-5 flex gap-3">
        <button
          onClick={() => navigate(location.pathname + "?addMember=true")}
          className="bg-purple-400 hover:bg-purple-500 px-5 py-5 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Agregar colaborador
        </button>
        <Link
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-5 text-white text-xl font-bold cursor-pointer transition-colors"
          to={`/projects/${projectId}/details`}
        >
          Volver a el proyecto
        </Link>
      </nav>
      <AddMemberModal />
    </div>
  );
};

export default ProjectTeamView;

import { AddUserToProject } from "@/api/TeamApi";
import { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultprops = {
  user: TeamMember;
};
function SearchResult({ user }: SearchResultprops) {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { mutate } = useMutation({
    mutationFn: AddUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate(location.pathname, { replace: true });
    },
  });
  const handleAddUserToProject = () => {
    const data = { projectId, id: user._id };
    mutate(data);
  };
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex flex-col gap-4 md:flex-row justify-evenly items-center">
        <p>{user.name}</p>
        <button
          onClick={handleAddUserToProject}
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}

export default SearchResult;

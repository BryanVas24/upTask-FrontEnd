import { TeamMember } from "@/types/index";

type SearchResultprops = {
  user: TeamMember;
};
function SearchResult({ user }: SearchResultprops) {
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex flex-col gap-4 md:flex-row justify-evenly items-center">
        <p>{user.name}</p>
        <button className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer">
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}

export default SearchResult;

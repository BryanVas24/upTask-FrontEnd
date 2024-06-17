import { Link } from "react-router-dom";
const CreateProjectView = () => {
  return (
    <>
      <h1 className="text-5xl font-black">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        LLena el siguiente formulario para crear un proyecto
      </p>
      <div className="my-5">
        <Link
          to={"/"}
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors cursor-pointer"
        >
          Nuevo proyecto
        </Link>
      </div>
    </>
  );
};

export default CreateProjectView;

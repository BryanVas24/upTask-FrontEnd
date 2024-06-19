import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createproject } from "@/api/ProjectApi";
const CreateProjectView = () => {
  //estos son los valores iniciales del form
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  //esto es de react-hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  //esta es la función que se pasa en el handle submit de react-hook-form
  const handleForm = (data: ProjectFormData) => {
    createproject(data);
  };

  //-----el no validate en el form deshanilita la validación de hmtl5 para que la hagas vos
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          LLena el siguiente formulario para crear un proyecto
        </p>
        <div className="my-5">
          <Link
            to={"/"}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors cursor-pointer"
          >
            Volver a inicio
          </Link>
        </div>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Crear proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;

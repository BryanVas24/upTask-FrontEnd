import { Link } from "react-router-dom";

import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type EditProjectFormProps = {
  data: ProjectFormData;
};
const EditProjectForm = ({ data }: EditProjectFormProps) => {
  const { clientName, projectName, description } = data;

  //esto es de react-hook form y ahora estas metiendo los initial values de un solo
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName,
      clientName,
      description,
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    console.log(formData);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Para editar un proyecto completa el formulario
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
          <div className="mb-5 space-y-3">
            <label
              htmlFor="projectName"
              className="text-sm uppercase font-bold"
            >
              Nombre del Proyecto
            </label>
            <input
              id="projectName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Nombre del Proyecto"
              {...register("projectName", {
                required: "El Titulo del Proyecto es obligatorio",
              })}
            />

            {errors.projectName && (
              <ErrorMessage>{errors.projectName.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label htmlFor="clientName" className="text-sm uppercase font-bold">
              Nombre Cliente
            </label>
            <input
              id="clientName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Nombre del Cliente"
              {...register("clientName", {
                required: "El Nombre del Cliente es obligatorio",
              })}
            />

            {errors.clientName && (
              <ErrorMessage>{errors.clientName.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              htmlFor="description"
              className="text-sm uppercase font-bold"
            >
              Descripción
            </label>
            <textarea
              id="description"
              className="w-full p-3  border border-gray-200"
              placeholder="Descripción del Proyecto"
              {...register("description", {
                required: "Una descripción del proyecto es obligatoria",
              })}
            />

            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Guardar cambios"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;

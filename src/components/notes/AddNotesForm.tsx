const AddNotesForm = () => {
  return (
    <form onSubmit={() => {}} className="space-y-3" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Nota
        </label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
        />
      </div>
      <input
        type="submit"
        value="Crear nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
};

export default AddNotesForm;

import { deleteTask } from "@/api/TaskApi";
import { Task } from "@/types/index";
import { useDraggable } from "@dnd-kit/core";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

type TaskCardProps = {
  task: Task;
  canEdit: boolean;
};
const TaskCard = ({ task, canEdit }: TaskCardProps) => {
  //sirve para el drag and drop y a ley tenes que pasarle un id unico

  /*attributes: es necesario
  listeners: son una serie de funciones que permiten habilitar los elementos html estatico 
  setNoderef: sirve para decir a qu elemento se le va aplicar el draggable
  transform: es para aplicarles algo de css a esos elementos*/

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      //elimina el querySTring
      navigate(location.pathname, { replace: true });
    },
  });

  const style = transform
    ? //esto te permite moverlo en horizontal vertical y en el fondo
      { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
    : undefined;
  return (
    <div>
      <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
        <div
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          style={style}
          className="min-w-0 flex flex-col gap-y-4"
        >
          <button
            type="button"
            className="text-xl font-bold text-slate-600 text-left"
            onClick={() => {
              navigate(location.pathname + `?viewTask=${task._id}`);
            }}
          >
            {task.name}
          </button>
          <p className="text-slate-500">{task.description}</p>
        </div>
        <div className="flex shrink-0  gap-x-6">
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">opciones</span>
              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  <button
                    onClick={() => {
                      navigate(location.pathname + `?viewTask=${task._id}`);
                    }}
                    type="button"
                    className="block px-3 py-1 text-sm leading-6 text-gray-900"
                  >
                    Ver Tarea
                  </button>
                </Menu.Item>
                {canEdit && (
                  <>
                    <Menu.Item>
                      <button
                        type="button"
                        className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        onClick={() => {
                          navigate(location.pathname + `?editTask=${task._id}`);
                        }}
                      >
                        Editar Tarea
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button
                        type="button"
                        className="block px-3 py-1 text-sm leading-6 text-red-500"
                        onClick={() => mutate({ projectId, taskId: task._id })}
                      >
                        Eliminar Tarea
                      </button>
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </li>
    </div>
  );
};

export default TaskCard;

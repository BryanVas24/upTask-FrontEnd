import { Task, taskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { StatusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
//siempre que usas drag and drop necesitas este context
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};
//yipo de la lista inicial
type GroupedTasks = {
  [key: string]: Task[];
};

//esto es para cambiar color de bordes dinamicamente
const BorderStatusColor: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};
//para que los arrays no esten vacios en la primera iteración
const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};
const TaskList = ({ tasks, canEdit }: TaskListProps) => {
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
    },
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  //el onDragEnd en el DndContext es para indicar que pasa cuando soltas algo en el
  const handleDragEnd = (event: DragEndEvent) => {
    //esto es para conseguir en donde se esta enviando
    const { over, active } = event;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as taskStatus;
      mutate({ projectId, taskId, status });
    }
  };
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl text-center font-light border border-slate-300 bg-white p-3 border-t-8 ${BorderStatusColor[status]}`}
              >
                {StatusTranslations[status]}
              </h3>
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard canEdit={canEdit} key={task._id} task={task} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
};

export default TaskList;

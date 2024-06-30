import { z } from "zod";

/*--TAREAS---*/

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);
export type taskStatus = z.infer<typeof taskStatusSchema>;
export const takSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof takSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
/*-----PROJECTOS------*/

export const projetcSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardProjectsSchema = z.array(
  projetcSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);
//esto es para que el type de Porject tenga la estructura de arriba
export type Project = z.infer<typeof projetcSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

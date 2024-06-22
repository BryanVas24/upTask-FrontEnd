import { z } from "zod";

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

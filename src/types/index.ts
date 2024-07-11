import { z } from "zod";
/*-'-'Usuarios-''--'*/

/*--TAREAS---*/
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

export type ConfrimToken = Pick<Auth, "token">;
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
/*----USUARIOS-------*/
export const UserSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
export type User = z.infer<typeof UserSchema>;
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

/*Team*/

const teamMemberSchema = UserSchema.pick({
  name: true,
  email: true,
  _id: true,
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

import { z } from "zod";
/*-'-'auth-''--'*/

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
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
export type UpdateCurrentPasswordForm = Pick<
  Auth,
  "current_password" | "password" | "password_confirmation"
>;
export type chekPasswordForm = Pick<Auth, "password">;
export type ConfrimToken = Pick<Auth, "token">;
/*----USUARIOS-------*/
export const UserSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
/*----PERFIL--- */
export type UserProfileForm = Pick<User, "email" | "name">;
export type User = z.infer<typeof UserSchema>;
/*---NOTAS---*/
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: UserSchema,
  task: z.string(),
  createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;
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
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: UserSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(noteSchema.extend({ createdBy: UserSchema })),
});

export type Task = z.infer<typeof takSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/*-----PROJECTOS------*/

export const projetcSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(UserSchema.pick({ _id: true })),
});

export const dashboardProjectsSchema = z.array(
  projetcSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
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
export const TeamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

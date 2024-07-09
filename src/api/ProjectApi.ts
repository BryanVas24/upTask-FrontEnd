import api from "@/lib/axios";
import { dashboardProjectsSchema, Project, ProjectFormData } from "../types";
import { isAxiosError } from "axios";
export async function createproject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAllProjects() {
  try {
    //tomando el jwt del locale storage
    const JWtoken = localStorage.getItem("AUTH_TOKEN");
    //recorda que en axios siempre es get el metodo por defecto
    //envias los headers porque el backend pide un jwt como Bearer
    const { data } = await api("/projects", {
      headers: {
        Authorization: `Bearer ${JWtoken}`,
      },
    });
    const response = dashboardProjectsSchema.safeParse(data);
    console.log(data);
    if (response.success) {
      return response.data;
    } else {
      console.error("No coincide con el esquema");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getOneProject(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};
export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    //use el generic solo para que data no sea any
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

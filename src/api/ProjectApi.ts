import api from "@/lib/axios";

import { dashboardProjectsSchema, ProjectFormData } from "../types";
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
    //recorda que en axios siempre es get el metodo por defecto
    const { data } = await api("/projects");
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

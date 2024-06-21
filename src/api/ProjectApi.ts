import api from "@/lib/axios";
import { ProjectFormData } from "../types";
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
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

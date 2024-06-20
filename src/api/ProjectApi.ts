import api from "@/lib/axios";
import { ProjectFormData } from "../types";
export async function createproject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    console.error(error);
  }
}

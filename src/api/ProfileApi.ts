import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UserProfileForm } from "../types";

export async function updateProfile(formData: UserProfileForm) {
  try {
    const url = `/auth/profile`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

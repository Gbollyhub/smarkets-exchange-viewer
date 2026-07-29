import api from "@/lib/api";

export const eventNavigation = async () => {
  const { data } = await api.get("/api/v0/navigation/");
  return data;
};
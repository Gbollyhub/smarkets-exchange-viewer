import api from "@/lib/api";

const eventNavigation = async () => {
  const { data } = await api.get("/api/v0/navigation/");
  return data;
};

export default eventNavigation;
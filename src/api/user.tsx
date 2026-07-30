import api from "@/lib/api";

const getUser = async () => {
  const { data } = await api.get("/api/v0/users/current/");
  return data;
};

export default getUser;
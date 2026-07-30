import api from "@/lib/api";

const getUser = async () => {
  const { data } = await api.get("/v3/users/");
  return data;
};

export default getUser;

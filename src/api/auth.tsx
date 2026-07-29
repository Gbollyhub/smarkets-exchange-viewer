import api from "@/lib/api";

const login = async (inputData: { email: string; password: string }) => {
  const credentials = {
    username: inputData.email,
    password: inputData.password,
    mode: "header",
    remember: true,
  };
  const { data } = await api.post("/api/v0/sessions/", credentials);
  return data;
};

export default login;

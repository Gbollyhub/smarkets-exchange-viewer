import api from "@/lib/api";

const login = async (inputData: { email: string; password: string, remember: boolean }) => {
  const credentials = {
    username: inputData.email,
    password: inputData.password,
    create_social_member: true,
    remember: inputData.remember,
  };
  const { data } = await api.post("/v3/sessions/", credentials);

  return data;
};

export async function logoutSession() {
  const { data } = await api.delete("/v0/sessions/current/");
  return data;
}

export default login;

import api from "@/lib/api";

const login = async (inputData: { email: string; password: string }) => {
  const credentials = {
    username: inputData.email,
    password: inputData.password,
    create_social_member: true,
    remember: true,
  };
  const { data } = await api.post("/v3/sessions/", credentials);

  return data;
};

export async function refreshSession(refreshToken: string) {
  const { data } = await api.post("/v3/easy/refresh/", {
    refresh_token: refreshToken,
  });

  return {
    token: data.session_token, 
    refresh_token: data.refresh_token,
  };
}

export default login;

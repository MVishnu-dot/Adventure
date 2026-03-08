import api from "./axios";

export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};


// SIGNUP (normal JSON)
export const signupUser = async (name, email, password) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
};

// GET CURRENT USER
export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
};

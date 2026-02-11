import api from "./axios";

// Get all adventures
export const getAllAdventures = async () => {
  const res = await api.get("/adventure/");
  return res.data;
};

// Get single adventure by ID
export const getAdventureById = async (id) => {
  const res = await api.get(`/adventure/${id}`);
  return res.data;
};

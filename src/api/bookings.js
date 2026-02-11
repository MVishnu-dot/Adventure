import api from "./axios";

// Create booking
export const createBooking = async (payload) => {
  const res = await api.post("/bookings/", payload);
  return res.data;
};

// Get my bookings
export const getMyBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const res = await api.delete(`/bookings/${bookingId}`);
  return res.data;
};

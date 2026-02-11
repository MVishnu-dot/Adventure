import api from "./axios";

// Create fake order
export const createFakeOrder = async (payload) => {
  const res = await api.post("/payments/create-order", payload);
  return res.data;
};

// Mark payment success
export const fakePaymentSuccess = async (payload) => {
  const res = await api.post("/payments/fake-success", payload);
  return res.data;
};

// Mark payment failed
export const fakePaymentFail = async (payload) => {
  const res = await api.post("/payments/fake-fail", payload);
  return res.data;
};

// Get my payments
export const getMyPayments = async () => {
  const res = await api.get("/payments/my");
  return res.data;
};

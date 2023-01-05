import axios from "./axios";

/**
 * @url POST /users/signup
 * @since 1.0
 */
export const sigin = (payload) => axios.post("/users/login/", payload);

/**
 * @url POST /users/signup
 * @since 1.0
 */
export const signupUser = (payload) => axios.post("/users/signup/", payload);

/**
 * @url GET /api/v2/users/
 * @since 2.0 ¡Important!
 */
export const fetchUsers = () => axios.get("/api/v2/users/");

/**
 * @url GET /api/v2/services/
 * @since 2.0 ¡Important!
 */
export const fetchServices = () => axios.get("/api/v2/services/");

/**
 * @url POST /api/v2/services/
 * @since 2.0 ¡Important!
 */
export const createService = (payload) =>
    axios.post("/api/v2/services/", payload);

/**
 * @url PUT /api/v2/services/
 * @since 2.0 ¡Important!
 */
export const updateService = (payload) =>
    axios.put(`/api/v2/services/${payload.id}/`, payload);

/**
 * @url DELETE /api/v2/services/
 * @since 2.0 ¡Important!
 */
export const destroyService = (id) =>
    axios.delete(`/api/v2/services/${id}/`);

/**
 * @url DELETE /api/v2/payments/
 * @since 2.0 ¡Important!
 */
export const fetchPayments = () =>
    axios.get("/api/v2/payments/");

/**
 * @url POST /api/v2/payments/
 * @since 2.0 ¡Important!
 */
export const createPayment = (payload) =>
    axios.post("/api/v2/payments/", payload);

/**
 * @url PUT /api/v2/payments/
 * @since 2.0 ¡Important!
 */
export const updatePayment = (payload) =>
    axios.put(`/api/v2/payments/${payload.id}`, payload);

/**
 * @url delete /api/v2/payments/
 * @since 2.0 ¡Important!
 */
export const deletePayment = (id) =>
    axios.delete(`/api/v2/payments/${id}`);

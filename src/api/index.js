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
 * @url POST /api/v2/users/
 * @since 2.0 ¡Important!
 */
export const fetchUsers = () => axios.get("/api/v2/users/");

/**
 * @url POST /users/signup
 * @since 2.0 ¡Important!
 */
export const fetchServices = () => axios.get("/api/v2/services/");

import axios from "./axios";

/**
 * @url POST /users/signup
 * @since 1.0
 */
export const signupUser = (payload) => axios.post("/users/signup/", payload);

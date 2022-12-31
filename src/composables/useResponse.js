import rtypes from "../data/response";

export const useResponse = () => {

  function showAlert(payload) {
    const { status_code, message } = payload;
    if (!status_code) {
      let first = payload[Object.keys(payload)[0]];
      if (Array.isArray(first)) first = first[0];
      return {
        color: "alert alert-danger",
        message: first || "Ocurrió un error"
      };
    }
    return {
      color: rtypes[status_code],
      message: message
    };
  }

  return {
    showAlert
  };
};

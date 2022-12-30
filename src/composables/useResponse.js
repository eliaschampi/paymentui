export const useResponse = () => {
  const types = {
    200: "alert alert-success",
    201: "alert alert-success",
    400: "alert alert-warning",
    401: "alert alert-warning",
    404: "alert alert-warning",
    422: "alert alert-warning",
    500: "alert alert-danger",
    502: "alert alert-danger",
    503: "alert alert-danger"
  };

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
      color: types[status_code],
      message: message
    };
  }

  return {
    showAlert
  };
};

import Swal from "sweetalert2";
import rtypes from "../data/response";
const toast = Swal.mixin({
  buttonsStyling: false,
  target: "#page-container",
  customClass: {
    confirmButton: "btn btn-success m-1"
  },
  confirmButtonText: "De acuerdo"
});
export const useResponse = () => {
  function showAlert(payload) {
    const { status_code, message, success } = payload;

    if (!status_code) {
      let first = payload[Object.keys(payload)[0]];
      if (Array.isArray(first)) first = first[0];
      return {
        type: "danger",
        title: "Ocurrió algo inesperado",
        color: "alert alert-danger",
        message: first || "Inténtelo mas tarde por favor"
      };
    }

    const type = rtypes[status_code];
    return {
      type,
      title: success ? "En hora buena!" : "Ocurrió algo inesperado",
      color: `alert alert-${type}`,
      message: message
    };
  }

  function showNotify(response) {
    const { title, message, type } = showAlert(response);
    toast.fire(title, message, type);
  }

  return {
    showAlert,
    showNotify
  };
};

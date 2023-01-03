import Swal from "sweetalert2";
import rtypes from "../data/response";
const toast = Swal.mixin({
  buttonsStyling: false,
  target: "#page-container",
  customClass: {
    confirmButton: "btn btn-success m-1",
    cancelButton: "btn btn-success"
  },
  confirmButtonText: "De acuerdo",
  cancelButtonText: 'No'
});
export const useResponse = () => {
  
  function showAlert(payload, maybeerror = false) {
    const { status_code, message, success } = payload;
    if (!status_code) {
      if (maybeerror) {
        let first = payload[Object.keys(payload)[0]];
        if (Array.isArray(first)) first = first[0];
        return {
          type: "error",
          title: "Ocurrió algo inesperado",
          color: "alert alert-danger",
          message: first || "Inténtelo mas tarde por favor"
        };
      }
      return {
        type: "success",
        title: "En hora buena!",
        message: "Operación correcta"
      };
    }
    return {
      type: success ? "success" : "warning",
      title: success ? "En hora buena!" : "Ocurrió algo inesperado",
      color: `alert alert-${rtypes[status_code]}`,
      message: message
    };
  }

  function showNotify(response) {
    const { title, message, type } = showAlert(response);
    toast.fire(title, message, type);
  }

  async function confirm(title, callback) {
    toast.fire({ title, icon: "question", showCancelButton: true }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  return {
    showAlert,
    showNotify,
    confirm
  };
};

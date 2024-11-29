import Swal from "sweetalert2";

const sweetalert = {
  deleteOrNot: () =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }),

  deletedDone: (name) =>
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: `The ${name} has been deleted successfully.`,
      confirmButtonColor: "#3085d6",
    }),

  deletedError: () =>
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Something went wrong, please try again.",
      confirmButtonColor: "#d32f2f",
    }),
};

export default sweetalert;

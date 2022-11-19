import toast from "react-hot-toast";
import {isError} from "lodash";

export const toastError = (error) => {
    toast.error(isError(error) ? error.toString() : "Unkown error")
}

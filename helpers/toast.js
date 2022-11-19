import toast from "react-hot-toast";

export const toastError = (error) => {
    toast.error(error || "Unkown error")
}

export const toastServerError = ({error} = response) =>{
    toastError(error)
}

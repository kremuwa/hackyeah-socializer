import toast from "react-hot-toast";

export const toastError = (error) => {
    toast.error(error || "Unknown error")
}

export const toastServerError = ({error} = response) =>{
    toastError(error)
}

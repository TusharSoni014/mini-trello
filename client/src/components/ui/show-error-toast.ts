import { toast } from "sonner";

export const showErrorToast = (error: any) => {
  toast(error.response.data.message);
};

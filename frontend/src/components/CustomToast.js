import { toast } from "sonner";

const CustomToast = (message) => {
  toast.success(message, {
    style: {
      backgroundColor: "#cdd1ce",
      color: "#181a19",
    },
  });
};

export default CustomToast;

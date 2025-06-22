// hooks/useToast.js
import toast from "react-hot-toast";

export const useToast = () => {
  // Success Toast - Green Theme
  const showSuccess = (message) => {
    return toast.success(message, {
      duration: 3000,
      style: {
        background: "#10B981", // Green
        color: "#ffffff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#10B981",
      },
    });
  };

  // Error Toast - Red Theme
  const showError = (message) => {
    return toast.error(message, {
      duration: 4000,
      style: {
        background: "#EF4444", // Red
        color: "#ffffff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#EF4444",
      },
    });
  };

  // Loading Toast - Purple Theme
  const showLoading = (message) => {
    return toast.loading(message, {
      style: {
        background: "#6366F1", // Purple
        color: "#ffffff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    });
  };

  // Info Toast - Blue Theme
  const showInfo = (message) => {
    return toast(message, {
      duration: 3000,
      icon: "💡",
      style: {
        background: "#3B82F6", // Blue
        color: "#ffffff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    });
  };

  // Warning Toast - Orange Theme
  const showWarning = (message) => {
    return toast(message, {
      duration: 3500,
      icon: "⚠️",
      style: {
        background: "#F59E0B", // Orange
        color: "#ffffff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    });
  };

  // Dismiss specific toast
  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  // Dismiss all toasts
  const dismissAll = () => {
    toast.dismiss();
  };

  // Custom toast with your own styling
  const showCustom = (message, options = {}) => {
    return toast(message, {
      duration: 3000,
      style: {
        background: "#1F2937", // Dark gray
        color: "#ffffff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(31, 41, 55, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...options.style,
      },
      ...options,
    });
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    showCustom,
    dismiss,
    dismissAll,
  };
};

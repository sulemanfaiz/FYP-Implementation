// components/ToastProvider.jsx
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Global toast options
          duration: 3000,
          style: {
            maxWidth: "400px",
            minWidth: "300px",
          },
          // Default success style
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#ffffff",
            },
          },
          // Default error style
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#ffffff",
            },
          },
          // Default loading style
          loading: {
            iconTheme: {
              primary: "#6366F1",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider;

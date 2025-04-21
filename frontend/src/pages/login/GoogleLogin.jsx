import { useEffect, useRef, useState } from "react";
import { Modal } from "antd"; // ✅ This line is required
const GoogleLogin = () => {
  const buttonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        clearInterval(interval);

        try {
          window.google.accounts.id.initialize({
            client_id: "55423345249-c305uo0t6m3l0niv8cil3bi2grhgkio3.apps.googleusercontent.com",
            callback: handleCredentialResponse,
          });

          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
          });
        } catch (error) {
          setErrorMessage("Google Authentication failed to initialize.");
          setIsModalOpen(true);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      if (!response.credential) throw new Error("Invalid credential response.");
      console.log("Encoded JWT:", response.credential);
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div ref={buttonRef}></div>
      <Modal
        title="Authentication Error"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="Okay"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>{errorMessage}</p>
      </Modal>
    </>
  );
};

export default GoogleLogin;

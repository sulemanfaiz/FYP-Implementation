import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { message as antdMessage } from "antd";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // You can specify a return_url here if you want to redirect
        // after payment. But for a single-page app, it's better to handle
        // the result directly.
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(
        error.type === "card_error" || error.type === "validation_error"
          ? error.message
          : "An unexpected error occurred."
      );
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment succeeded. Now, verify it on the backend.
      try {
        const res = await fetch("/api/transactions/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        });

        if (res.ok) {
          antdMessage.success("Payment successful! The house is now sold.");
          setMessage("Payment successful! Redirecting...");
          // Redirect to a success page or user's properties page
          setTimeout(() => navigate("/my-properties"), 3000);
        } else {
          const data = await res.json();
          setMessage(data.message || "Failed to verify payment on the server.");
        }
      } catch (serverError) {
        setMessage("An error occurred while verifying the payment.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;

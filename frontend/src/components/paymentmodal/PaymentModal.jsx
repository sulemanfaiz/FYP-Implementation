import React from "react";
import { Modal, Button, Spin } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Rh4GqP8mAGbcY5dbHgIyc3JI4mBWUFeLrebkxvps75XmkR0s9YdgGTKmtxfh7Res20EXtuWC5euZCu3kaqhI1bV00vN7Av7X8");

const CheckoutForm = ({ amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Call backend to create payment intent
      const res = await fetch("/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100, currency: "usd" }),
      });
      const { clientSecret } = await res.json();
      if (!clientSecret) throw new Error("Failed to get payment secret");
      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess(result.paymentIntent);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16 }}>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Pay ${amount}
        </Button>
      </div>
    </form>
  );
};

const PaymentModal = ({ visible, amount, onSuccess, onCancel }) => (
  <Modal
    open={visible}
    onCancel={onCancel}
    footer={null}
    title="Premium Payment"
    centered
  >
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  </Modal>
);

export default PaymentModal;

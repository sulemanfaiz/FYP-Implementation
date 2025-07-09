import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Modal, Button } from "antd";

// Make sure to add your publishable key to a .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { propertyId } = useParams();
  const [commissionConfirmed, setCommissionConfirmed] = useState(false);
  const [commissionModalVisible, setCommissionModalVisible] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "";
  const COMMISSION_RATE =
    parseFloat(process.env.REACT_APP_COMMISSION_RATE) || 0.05;

  useEffect(() => {
    const fetchPropertyAndCreateIntent = async () => {
      try {
        // 1. Fetch property details first
        const propRes = await fetch(
          `${API_URL}/listing/get-listing-detail/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const propData = await propRes.json();

        if (!propRes.ok || !propData.data) {
          // Check for data object
          throw new Error(
            propData.message || "Could not fetch property details."
          );
        }
        setProperty(propData.data); // Set the nested data object

        // 2. Create PaymentIntent
        const intentRes = await fetch(
          `${API_URL}/api/transactions/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ propertyId }),
          }
        );
        const intentData = await intentRes.json();

        if (!intentRes.ok) {
          throw new Error(
            intentData.message || "Could not create payment intent."
          );
        }
        setClientSecret(intentData.clientSecret);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyAndCreateIntent();
    }
  }, [propertyId, API_URL]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading payment details...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Error: {error}
      </p>
    );
  }

  const totalAmount = parseFloat(property.rent);
  const commissionAmount = totalAmount * COMMISSION_RATE;
  const netAmount = totalAmount - commissionAmount;

  // Commission Confirmation Modal
  const handleCommissionConfirm = () => {
    setCommissionConfirmed(true);
    setCommissionModalVisible(false);
  };
  const handleCommissionCancel = () => {
    setCommissionModalVisible(false);
    // Optionally, redirect or block payment if not confirmed
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <Modal
        open={commissionModalVisible}
        onCancel={handleCommissionCancel}
        footer={null}
        title="Commission Notice"
        centered
        closable={false}
        maskClosable={false}
      >
        <h3>Commission Details</h3>
        <p>
          <strong>Total Rent:</strong> ${totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Commission Rate:</strong> {COMMISSION_RATE * 100}%
        </p>
        <p>
          <strong>Commission Amount:</strong> ${commissionAmount.toFixed(2)}
        </p>
        <p>
          <strong>Net to Landlord:</strong> ${netAmount.toFixed(2)}
        </p>
        <p style={{ color: "red", marginTop: 16 }}>
          By proceeding, you acknowledge that Rent a Space will deduct a
          commission of {COMMISSION_RATE * 100}% from the rent.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 24,
          }}
        >
          <Button onClick={handleCommissionCancel} danger>
            Cancel
          </Button>
          <Button type="primary" onClick={handleCommissionConfirm}>
            I Acknowledge & Proceed
          </Button>
        </div>
      </Modal>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Confirm Your Payment
      </h2>
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "4px",
        }}
      >
        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
          {property.title}
        </h3>
        <p>
          <strong>Total Rent:</strong> ${totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Commission ({COMMISSION_RATE * 100}%):</strong> - $
          {commissionAmount.toFixed(2)}
        </p>
        <p>
          <strong>Net to Landlord:</strong> ${netAmount.toFixed(2)}
        </p>
      </div>
      {clientSecret && commissionConfirmed && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;

import { Modal, Spin } from "antd";
import {
  PredictionCardHeaderStyled,
  PredictionCardStyled,
} from "./predictioncard.styles";

const PredictionCard = ({
  visible,
  onClose,
  prediction = null,
  loading = false,
  error = null,
  confidence = null,
  totalListings = 5000,
}) => {
  const formatRent = (amount) => {
    if (!amount) return "0";
    return new Intl.NumberFormat("en-PK").format(Math.round(amount));
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return "#52c41a"; // Green
    if (score >= 70) return "#faad14"; // Orange
    return "#ff4d4f"; // Red
  };

  const getConfidenceText = (score) => {
    if (score >= 90) return "High";
    if (score >= 70) return "Medium";
    return "Low";
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      width={550}
    >
      <PredictionCardStyled>
        {loading ? (
          <div
            className="loading-container"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <Spin size="large" />
            <div style={{ marginTop: "16px", fontSize: "16px" }}>
              Analyzing your property...
            </div>
          </div>
        ) : error ? (
          <div
            className="error-container"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <div
              style={{
                fontSize: "18px",
                color: "#ff4d4f",
                marginBottom: "8px",
              }}
            >
              Prediction Failed
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>{error}</div>
          </div>
        ) : (
          <>
            <div className="predicted-rent-value">
              💰 Rs. {formatRent(prediction)} / month
            </div>
            <div className="predicted-rent-container">
              <div className="predicted-rent-desc">
                Predicted Rent Estimate based on your inputs and nearby trends
              </div>

              {confidence && (
                <div className="predicted-rent-confidence">
                  🔍 <b>Confidence Score:</b>{" "}
                  <span style={{ color: getConfidenceColor(confidence * 100) }}>
                    {Math.round(confidence * 100)}% (
                    {getConfidenceText(confidence * 100)})
                  </span>
                </div>
              )}

              <div className="predicted-rent-trained">
                Trained on <b>{totalListings?.toLocaleString()}+ </b>listings
              </div>

              {/* Additional prediction insights */}
              <div
                className="prediction-insights"
                style={{ marginTop: "16px", fontSize: "12px", color: "#666" }}
              >
                <div>
                  💡 <b>Tip:</b> Actual rent may vary based on exact location,
                  condition, and market timing
                </div>
              </div>
            </div>
            <div className="predicted-rent-powered">
              ⚡ Powered by SmartRent AI
            </div>
          </>
        )}
      </PredictionCardStyled>
    </Modal>
  );
};

export default PredictionCard;

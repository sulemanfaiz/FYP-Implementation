import { Modal } from "antd";
import {
  PredictionCardHeaderStyled,
  PredictionCardStyled,
} from "./predictioncard.styles";

const PredictionCard = ({
  visible,
  onClose,
  onSubmit,
  existingAmenities = [],
}) => {
  return (
    <Modal
      visible={visible}
      footer={null} // Custom footer
      onCancel={onClose}
      centered
      width={550}
    >
      <PredictionCardStyled>
        <div className="predicted-rent-value">💰 Rs. 45,000 / month</div>
        <div className="predicted-rent-container">
          <div className="predicted-rent-desc">
            Predicted Rent Estimate based on your inputs and nearby trends
          </div>

          <div className="predicted-rent-confidence">
            🔍 <b>Confidence Score:</b> 92%
          </div>
          <div className="predicted-rent-trained">
            Trained on <b>5,000+ </b>listings
          </div>
        </div>
        <div className="predicted-rent-powered">⚡ Powered by SmartRent AI</div>
      </PredictionCardStyled>
    </Modal>
  );
};

export default PredictionCard;

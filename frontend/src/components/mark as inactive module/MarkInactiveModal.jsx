import React, { useState } from "react";
import { Radio } from "antd";
import { Modal } from "antd";
import {
  ModalTitleStyled,
  ModalBodyStyled,
  ModalDescriptionStyled,
  RadioGroupStyled,
  TextAreaStyled,
  ModalFooterStyled,
  CancelButtonStyled,
  SubmitButtonStyled,
} from "./MarkInactiveModal.styles";

const MarkInactiveModal = ({ visible, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleSubmit = () => {
    if (!reason) {
      alert("Please select a reason before submitting.");
      return;
    }
    onSubmit({ reason, additionalDetails });
    setReason("");
    setAdditionalDetails("");
  };

  const handleCancel = () => {
    onClose();
    setReason("");
    setAdditionalDetails("");
  };

  return (
    <Modal
      title={<ModalTitleStyled>Mark Property as Inactive</ModalTitleStyled>}
      visible={visible}
      footer={null} // Custom footer
      onCancel={handleCancel}
      centered
    >
      <ModalBodyStyled>
        <ModalDescriptionStyled>
          Please let us know why you are marking this property as inactive:
        </ModalDescriptionStyled>
        <RadioGroupStyled
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        >
          <Radio value="Property is rented">Property is rented</Radio>
          <Radio value="No longer available">No longer available</Radio>
          <Radio value="Temporarily unavailable">Temporarily unavailable</Radio>
          <Radio value="Other">Other</Radio>
        </RadioGroupStyled>
        {reason === "Other" && (
          <TextAreaStyled
            rows={4}
            placeholder="Please specify your reason"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        )}
        <ModalFooterStyled>
          <CancelButtonStyled onClick={handleCancel}>Cancel</CancelButtonStyled>
          <SubmitButtonStyled onClick={handleSubmit}>
            Mark as Inactive
          </SubmitButtonStyled>
        </ModalFooterStyled>
      </ModalBodyStyled>
    </Modal>
  );
};

export default MarkInactiveModal;

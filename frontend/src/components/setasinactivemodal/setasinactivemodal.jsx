import React, { useCallback, useState } from "react";
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
} from "./setasinactivemodal.styles";
import { useNavigate, useParams } from "react-router-dom";

const SetAsInActiveModal = ({ visible, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => {
    onClose();
    setReason("");
    setComment("");
  };

  const listingId = useParams().id;

  const token = localStorage.getItem("token");

  const onMarkAsInactive = useCallback(async (values) => {
    try {
      const url = "http://localhost:8080/listing/mark-as-inactive/" + listingId;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // ✅ important
          Authorization: `Bearer ${token}`, // ✅ Important
        },
        body: JSON.stringify({
          comment: comment,
          reason: reason,
        }),
      });
      const result = await response.json();

      console.log("result", result);

      const { success, message, error } = result;
      if (success) {
        handleCancel();
        navigate("/my-properties");
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  }, []);

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
          <Radio value="rented">Property is rented</Radio>
          <Radio value="unavailable">No longer available</Radio>
          <Radio value="unsatisfied">Not satisfied with response</Radio>
          <Radio value="other">Other</Radio>
        </RadioGroupStyled>
        {reason === "Other" && (
          <TextAreaStyled
            rows={4}
            placeholder="Please specify your reason"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        )}
        <ModalFooterStyled>
          <CancelButtonStyled onClick={handleCancel}>Cancel</CancelButtonStyled>
          <SubmitButtonStyled onClick={onMarkAsInactive}>
            Mark as Inactive
          </SubmitButtonStyled>
        </ModalFooterStyled>
      </ModalBodyStyled>
    </Modal>
  );
};

export default SetAsInActiveModal;

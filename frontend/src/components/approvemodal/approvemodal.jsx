import React, { useCallback, useState } from "react";
import { Radio } from "antd";
import { Modal } from "antd";
import { ApproveCardStyled } from "./approvemodal.styles";
import { BorderedButton } from "../profilenavbar/profilenavbarstyles";
import { BorderedButtonStyled } from "../../app.styles";

import { useNavigate, useParams } from "react-router-dom";

const ApproveListingModal = ({ visible, onClose, onSubmit }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    onClose();
  };

  const listingId = useParams().id;

  const token = localStorage.getItem("token");

  const onApproveListing = useCallback(async (values) => {
    try {
      const url = "http://localhost:8080/admin/approve-listing/" + listingId;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // ✅ important
          Authorization: `Bearer ${token}`, // ✅ Important
        },
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleCancel();
        navigate("/admin/review-listings");
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  }, []);

  return (
    <Modal
      visible={visible}
      footer={null} // Custom footer
      onCancel={handleCancel}
      centered
    >
      <ApproveCardStyled>
        <div className="desc">
          Once approved, this listing will be published and available for
          potential renters.
        </div>

        <BorderedButtonStyled onClick={onApproveListing}>
          Approve
        </BorderedButtonStyled>
      </ApproveCardStyled>
    </Modal>
  );
};

export default ApproveListingModal;

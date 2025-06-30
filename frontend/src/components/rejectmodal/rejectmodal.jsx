import React, { useCallback, useState } from "react";
import { Radio } from "antd";
import { Modal } from "antd";
import { BorderedButton } from "../profilenavbar/profilenavbarstyles";
import { BorderedButtonStyled, FilledButtonStyled } from "../../app.styles";
import {
  ModalBodyStyled,
  ModalDescriptionStyled,
  ModalFooterStyled,
  RejectTextAreaStyled,
  TextEditorStyled,
} from "./rejectmodal.styles";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import * as yup from "yup";

export const schema = yup.object().shape({
  reason: yup.string().required("This field is required"),
});

const EDITOR_TOOLBAR_OPTIONS = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ size: [] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["link"],
];

const RejectListingModal = ({ visible, onClose, onSubmit }) => {
  const {
    control,
    formState: { isValid, errors },
    getValues,
  } = useForm({
    defaultValues: {
      reason: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    onClose();
  };

  const listingId = useParams().id;

  const token = localStorage.getItem("token");

  const onRejectListing = useCallback(async (values) => {
    const reason = getValues("reason");

    try {
      const url = "http://localhost:8080/admin/reject-listing/" + listingId;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // ✅ important
          Authorization: `Bearer ${token}`, // ✅ Important
        },
        body: JSON.stringify({
          reasonToReject: reason,
        }),
      });
      const result = await response.json();

      console.log("result", result);

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
      width={650}
    >
      <ModalBodyStyled>
        <ModalDescriptionStyled>
          Rejecting this listing will prevent it from going live. Only the
          property owner will be able to view it along with your comments.{" "}
        </ModalDescriptionStyled>

        <Controller
          control={control}
          name="reason"
          render={({ field }) => (
            <TextEditorStyled>
              <ReactQuill
                {...field}
                placeholder="Please specify your reason to reject this listing..."
              />
            </TextEditorStyled>
            // <TextArea
            //   {...field}
            //   placeholder="Please specify your reason to reject this listing..."
            //   className="textarea-field"
            //   rows={6}
            // />
          )}
        />

        <ModalFooterStyled>
          <BorderedButtonStyled onClick={handleCancel}>
            Cancel
          </BorderedButtonStyled>
          <FilledButtonStyled
            className="reject-btn"
            style={{
              width: "100px",
              height: "35px",
            }}
            onClick={onRejectListing}
          >
            Reject
          </FilledButtonStyled>
        </ModalFooterStyled>
      </ModalBodyStyled>
    </Modal>
  );
};

export default RejectListingModal;

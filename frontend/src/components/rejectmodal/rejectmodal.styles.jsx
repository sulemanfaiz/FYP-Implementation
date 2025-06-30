import { Input } from "antd";
import styled from "styled-components";

export const ModalBodyStyled = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ModalDescriptionStyled = styled.p`
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  font-style: italic;
`;

export const ModalFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

export const RejectTextAreaStyled = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #e85451;
  }

  &:focus {
    border-color: #e85451;
    box-shadow: 0 0 0 2px rgba(232, 84, 81, 0.2);
    outline: none;
  }
`;

export const TextEditorStyled = styled.div`
  .quill {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    width: 590px;

    .ql-toolbar {
      border: none;

      .ql-formats {
        position: relative;

        &:not(:last-of-type) {
          &::after {
            content: "";
            position: absolute;
            height: 9px;
            width: 1px;
            background: grey;
            right: -10px;
            transform: translate(0, calc(50% + 3px));
          }
        }

        svg {
          .ql-fill {
            fill: grey;
          }

          .ql-stroke {
            stroke: grey;
          }
        }

        .ql-picker-label {
          &::before {
            color: grey;
          }
        }

        button {
          &:hover,
          &.ql-active {
            color: lightblue;

            .ql-stroke {
              stroke: lightblue;
            }

            .ql-fill {
              fill: lightblue;
            }
          }
        }

        .ql-picker-options {
          .ql-picker-item {
            &:hover {
              &::before {
                color: lightblue;
              }
            }
          }
        }
      }
    }

    .ql-container {
      border: none;
      background: white;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      .ql-editor {
        height: 155px;
      }

      .ql-tooltip.ql-flip {
        z-index: 10;
      }
    }
  }
`;

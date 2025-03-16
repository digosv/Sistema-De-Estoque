import { Children } from "react";
import "./Modal.css";

export const Modal = ({ onSubmit, onCancel, onClose, children }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <p className="close" onClick={() => onClose()}>
            &times;
          </p>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="btn btn-submit" onClick={() => onSubmit()}>
            Subtime
          </button>
          <button className="btn btn-cancel" onClick={() => onCancel()}>
            {" "}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

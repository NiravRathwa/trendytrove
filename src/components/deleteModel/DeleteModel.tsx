import { Modal } from "@mui/material";
import React from "react";
import "./Delete.css";
type DeleteModelProps = {
  open: boolean;
  handleClose: () => void;
  name: string;
};

const DeleteModel: React.FC<DeleteModelProps> = ({
  open,
  handleClose,
  name,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="card !bg-background">
          <div className="card-content">
            <p className="card-heading">Delete {name}?</p>
            <p className="card-description">
              This action is permanent and cannot be undone.
            </p>
          </div>
          <div className="card-button-wrapper">
            <button className="card-button secondary">Cancel</button>
            <button className="card-button primary">Delete</button>
          </div>
          <button className="exit-button" onClick={handleClose}>
            <svg height="20px" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModel;

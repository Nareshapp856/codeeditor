import { createPortal } from "react-dom";

function Modal({ ModalView }) {
  return createPortal(
    <div className="h-screen w-full z-50 fixed top-0 left-0 grid place-content-center">
      {<ModalView />}
    </div>,
    document.getElementById("root")
  );
}

export default Modal;

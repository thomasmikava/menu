import type { FC, ReactElement } from 'react';

const Modal: FC<{
  onClose: () => void;
  children: ReactElement;
}> = ({ onClose, children }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close-button' onClick={onClose}>
          X
        </span>
        <>{children}</>
      </div>
    </div>
  );
};

export default Modal;

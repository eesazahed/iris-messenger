import { FC, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  onClose?: () => void;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
`;

const Modal: FC<Props> = ({ children, onClose }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return <Overlay onClick={handleOverlayClick}>{children}</Overlay>;
};

export default Modal;

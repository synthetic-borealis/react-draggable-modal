import React, { useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

interface IModalProps {
  children?: ReactNode;
}

export default function Modal({ children }: IModalProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const minOnscreenWidth = 20;
  const minOnscreenHeight = 40;

  function handlePointerDown(evt: React.PointerEvent<HTMLDivElement>) {
    if (evt.button === 0) {
      setIsDragging(true);
      const target = evt.target as HTMLDivElement;
      target.setPointerCapture(evt.pointerId);
    }
  }

  function handlePointerUp(evt: React.PointerEvent<HTMLDivElement>) {
    if (evt.button === 0) {
      setIsDragging(false);
      const target = evt.target as HTMLDivElement;
      target.releasePointerCapture(evt.pointerId);
    }
  }

  function handlePointerLeave(evt: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    const target = evt.target as HTMLDivElement;
    target.releasePointerCapture(evt.pointerId);
  }

  function handlePointerMovement(evt: React.PointerEvent<HTMLDivElement>) {
    if (isDragging) {
      evt.preventDefault();
      const target = evt.target as HTMLDivElement;

      const minX = minOnscreenWidth - target.clientWidth;
      const minY = minOnscreenHeight - target.clientWidth;
      const maxX = target.parentElement !== null ?
        target.parentElement.clientWidth - minOnscreenWidth :
        window.innerWidth - minOnscreenWidth;
      const maxY = target.parentElement !== null ?
        target.parentElement.clientHeight - minOnscreenHeight :
        window.innerHeight - minOnscreenHeight;

      // Calculate new position coordinates and clamp them to ensure there's always a large
      // enough portion of the modal on the screen to capture pointer events.
      const left = Math.min(Math.max(target.offsetLeft + evt.movementX, minX), maxX);
      const top = Math.min(Math.max(target.offsetTop + evt.movementY, minY), maxY);

      target.style.setProperty('--left', `${left}px`);
      target.style.setProperty('--top', `${top}px`);
    }
  }

  return (
    <div
      className="Modal"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onMouseMove={handlePointerMovement}
    >
      {children}
    </div>
  );
}

Modal.defaultProps = {
  children: PropTypes.node,
};

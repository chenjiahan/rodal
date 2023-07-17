declare module 'rodal' {
  import { MouseEventHandler, JSX, PropsWithChildren } from 'react';

  type RodalProps = PropsWithChildren & {
    width?: number;
    height?: number;
    measure?: string;
    visible?: boolean;
    showMask?: boolean;
    closeOnEsc?: boolean;
    closeMaskOnClick?: boolean;
    showCloseButton?: boolean;
    animation?: string;
    enterAnimation?: string;
    leaveAnimation?: string;
    duration?: number;
    className?: string;
    customStyles?: Record<string, any>;
    customMaskStyles?: Record<string, any>;
    onClose?: MouseEventHandler<HTMLSpanElement>;
    onAnimationEnd?: () => never;
  };

  function Rodal(_: RodalProps): JSX.Element;
  export = Rodal;
}

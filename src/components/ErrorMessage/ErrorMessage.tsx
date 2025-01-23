import { FC, ReactNode } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

import './ErrorMessage.scss';

type ErrorMessageProps = {
  children: ReactNode;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return (
    <div className="error-message">
      <AiOutlineWarning className="error-message__icon" />
      {children}
    </div>
  );
};

export default ErrorMessage;

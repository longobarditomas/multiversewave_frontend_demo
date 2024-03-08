import React from 'react';

// Adjusted to accept an array of strings directly
type ErrorMessagesProps = {
    errors?: string[]; // Directly expects an array of strings
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
    if (!errors || errors.length === 0) return null;

    return (
        <div>
            {errors.map((message, index) => (
                <span key={index} className="form-error">{message}</span>
            ))}
        </div>
    );
};

export default ErrorMessages;

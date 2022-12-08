import React from 'react';

export const handleEnterDown = (
    e: React.KeyboardEvent | KeyboardEvent,
    handleCallback: (() => void) | (() => void)[]
) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        Array.isArray(handleCallback)
            ? handleCallback.map(c => c())
            : handleCallback();
    }
};

export const handleEscapeDown = (
    e: React.KeyboardEvent | KeyboardEvent,
    handleCallback: (() => void) | (() => void)[]
) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        Array.isArray(handleCallback)
            ? handleCallback.map(c => c())
            : handleCallback();
    }
};

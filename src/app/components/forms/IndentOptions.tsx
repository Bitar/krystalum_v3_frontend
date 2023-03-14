import React from 'react';

export const indentOptions = (option: any) => {
    if (option.parent !== null) {
        // this is a child
        return (
            <div style={{ marginLeft: '1em' }}>
                {option.name}
            </div>
        );
    } else {
        // this is a parent
        return (
            <div>
                {option.name}
            </div>
        );
    }
}
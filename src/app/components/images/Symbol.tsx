import React from 'react';

type Props = {
    path: string,
    alt: string,
    size?: string
}

const Symbol: React.FC<Props> = ({path, alt, size = '45px'}) => {
    return (
        <div className={`symbol symbol-${size} me-5`}>
            <img src={path} alt={alt}/>
        </div>
    );
}

export default Symbol;
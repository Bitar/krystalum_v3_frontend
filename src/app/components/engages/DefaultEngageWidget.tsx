import React from 'react';
import {Link} from 'react-router-dom';

type Props = {
    cardClasses?: string,
    cardBodyClasses?: string,
    backgroundColor?: string,
    backgroundPosition?: string,
    backgroundImage?: string,
    title: string,
    text: string,
    ctaText?: string,
    ctaUrl?: string,
    ctaClasses?: string
}

const DefaultEngageWidget: React.FC<Props> = ({
                                                  cardClasses = 'h-200px mb-5 mb-xl-8',
                                                  cardBodyClasses = '',
                                                  backgroundColor = '#1C325E',
                                                  backgroundPosition = 'right bottom',
                                                  backgroundImage = '/media/illustrations/sigma-1/17-dark.png',
                                                  title,
                                                  text,
                                                  ctaText,
                                                  ctaUrl,
                                                  ctaClasses = 'btn-danger fw-semibold px-6 py-3'
                                              }) => {
    return (
        <div
            className={`card card-xl-stretch bgi-no-repeat bgi-size-contain ${cardClasses}`}
            style={{
                backgroundColor: backgroundColor,
                backgroundPosition: backgroundPosition,
                backgroundImage: `url("${backgroundImage}")`
            }}
        >
            <div className={`card-body d-flex flex-column justify-content-between ${cardBodyClasses}`}
                 style={{width: '80%'}}>
                <h2 className="text-white fw-bold mb-1">{title}</h2>
                <p className="text-white mb-5">{text}</p>

                {
                    ctaText && ctaUrl &&
                    <div className="m-0">
                        <Link to={ctaUrl}
                              className={`btn ${ctaClasses}`}>
                            {ctaText}
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default DefaultEngageWidget;
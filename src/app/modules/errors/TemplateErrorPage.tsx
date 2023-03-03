import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
    code: number;
    title: string;
    message: string;
}

const TemplateErrorPage: React.FC<Props> = ({code, title, message}) => {
    return (
        <div className="d-flex flex-column flex-root" style={{backgroundColor: '#1e1e2d'}}>
            <div className="d-flex flex-column flex-center flex-column-fluid">
                <div className="d-flex flex-column flex-center text-center p-10">
                    <div className="card card-flush w-lg-650px py-5">
                        <div className="card-body py-15 py-lg-20">
                            <h1 className="fw-bolder text-gray-900" style={{fontSize: '50px'}}>{code}</h1>
                            <h3 className="fw-normal mb-4" style={{fontSize: '16px'}}>{title}</h3>
                            <div className="fw-semibold fs-6 text-gray-500 mb-7">
                                {message}
                            </div>

                            <div className="mb-0">
                                <Link to='/' className='btn btn-sm btn-krys'>
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateErrorPage;
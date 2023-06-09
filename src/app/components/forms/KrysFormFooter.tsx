import {useFormikContext} from 'formik';
import React from 'react'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

interface Props {
    cancelUrl: string,
    useSeparator?: boolean
}

const KrysFormFooter: React.FC<Props> = ({cancelUrl, useSeparator = true}) => {
    const {isSubmitting} = useFormikContext();

    return (
        <>
            {
                useSeparator && <div className="separator mb-6"></div>
            }

            <div className="d-flex justify-content-end">
                <Button variant="krys" type="submit" className={'me-2'} disabled={isSubmitting}>
                    {
                        isSubmitting && (
                            <span className='indicator-progress' style={{display: 'inline-block'}}>
                                <span className='spinner-border spinner-border-sm align-middle me-2'/> Please wait ...
                            </span>
                        )
                    }

                    {
                        !isSubmitting && 'Submit'
                    }
                </Button>

                <Link to={cancelUrl}>
                    <Button variant="light-secondary" type="submit">
                        Cancel
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default KrysFormFooter;
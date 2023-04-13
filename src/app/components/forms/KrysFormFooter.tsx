import React from 'react'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

interface Props {
    cancelUrl: string,
    loading?: boolean,
    useSeparator?: boolean,
    disableSubmit?: boolean
}

const KrysFormFooter: React.FC<Props> = ({cancelUrl, loading = false, useSeparator = true, disableSubmit= false}) => {
    return (
        <>
            {
                useSeparator && <div className="separator mb-6"></div>
            }

            <div className="d-flex justify-content-end">
                <Button variant="krys" type="submit" className={'me-2'} disabled={disableSubmit}>
                    { !loading && 'Submit' }
                    { loading && 'Please wait ...'}
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
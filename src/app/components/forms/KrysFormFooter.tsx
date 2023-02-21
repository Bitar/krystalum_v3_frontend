import React from 'react'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

interface Props {
    cancelUrl: string,
    loading?: boolean,
    useSeparator?: boolean
}

const KrysFormFooter: React.FC<Props> = ({cancelUrl, loading = false, useSeparator = true}) => {
    return (
        <>
            {
                useSeparator && <div className="separator mb-6"></div>
            }

            <div className="d-flex justify-content-end">
                <Button variant="krys" type="submit" className={'me-2'}>
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
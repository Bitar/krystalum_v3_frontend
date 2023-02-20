import React from 'react'
import {Button} from 'react-bootstrap';

interface Props {
    loading?: boolean
}

const KrysFormFooter: React.FC<Props> = ({loading = false}) => {
    return (
        <>
            <div className="separator mb-6"></div>

            <div className="d-flex justify-content-end">
                <Button variant="krys" type="submit">
                    { !loading && 'Submit' }
                    { loading && 'Please wait ...'}
                </Button>
            </div>
        </>
    );
}

export default KrysFormFooter;
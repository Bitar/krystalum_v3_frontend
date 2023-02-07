import React from 'react'
import {Button} from 'react-bootstrap';

const KrysFormFooter: React.FC = () => {
    return (
        <>
            <div className="separator mb-6"></div>

            <div className="d-flex justify-content-end">
                <Button variant="krys" type="submit">Submit</Button>
            </div>
        </>
    );
}

export default KrysFormFooter;
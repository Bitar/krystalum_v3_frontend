import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';

interface Props {
    title: string,
    buttonText: string,
    buttonVariant: string,
    size?: 'sm' | 'lg' | 'xl',
    buttonSize?: 'sm' | 'lg',
    submitButtonText?: string,
    buttonIconClasses?: string
}

const KrysModal: React.FC<React.PropsWithChildren<Props>> = ({
                                                                 title,
                                                                 buttonText,
                                                                 buttonVariant,
                                                                 size,
                                                                 buttonSize,
                                                                 submitButtonText,
                                                                 buttonIconClasses,
                                                                 children
                                                             }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={buttonVariant} onClick={handleShow} size={buttonSize !== undefined ? buttonSize : 'sm'}>
                {
                    buttonIconClasses ? <i className={buttonIconClasses}></i> : <></>
                }

                {buttonText}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={size ? size : 'xl'}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="krys">{submitButtonText ? submitButtonText : 'Save'}</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default KrysModal;
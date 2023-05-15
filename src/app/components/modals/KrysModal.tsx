import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface Props {
    title: string,
    buttonText: string,
    buttonVariant: string,
    onSubmit: (e: any) => void,
    forceHide?: boolean,
    setForceHide?: Dispatch<SetStateAction<any>>,
    forceShow?: boolean,
    setForceShow?: Dispatch<SetStateAction<any>>,
    size?: 'sm' | 'lg' | 'xl',
    buttonSize?: 'sm' | 'lg',
    submitButtonText?: string,
    buttonIconClasses?: string
    onClose?: (e: any) => void
}

const KrysModal: React.FC<React.PropsWithChildren<Props>> = ({
                                                                 title,
                                                                 buttonText,
                                                                 buttonVariant,
                                                                 onSubmit,
                                                                 forceHide = false,
                                                                 setForceHide,
                                                                 forceShow = false,
                                                                 setForceShow,
                                                                 size,
                                                                 buttonSize,
                                                                 submitButtonText,
                                                                 buttonIconClasses,
                                                                 onClose,
                                                                 children
                                                             }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => {
        // if we just closed the modal, we don't want to force open it
        if (setForceShow) {
            setForceShow(false);
        }

        setShow(false)
    };
    const handleShow = () => {
        // when we just opened the modal, we don't want to force close it
        if (setForceHide) {
            setForceHide(false);
        }

        setShow(true)
    };

    useEffect(() => {
        if (forceHide) {
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceHide]);

    useEffect(() => {
        if (forceShow) {
            handleShow();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceShow]);

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
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="krys" onClick={onSubmit}>{submitButtonText ? submitButtonText : 'Save'}</Button>
                    <Button variant="secondary" onClick={onClose ? onClose : handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default KrysModal;
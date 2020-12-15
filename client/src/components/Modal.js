import React from 'react';
import classes from '../styles/components/modal.module.scss';

const Modal = ({title, description, show, closeModal, icon}) => {
    return(
        <div className={classes.ModalWrapper} style={{opacity: show ? '1': '0'}} >
            <span onClick={closeModal}>
                        X
            </span>
            <div className={classes.ModalContent}>
                <div className={classes.ModalFlex}>
                    <img src={icon} alt={title} className={classes.ModalIcon} />
                </div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            
        </div>
    )
}

export default Modal;
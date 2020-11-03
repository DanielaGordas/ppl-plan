import React from 'react';
import classes from '../styles/components/modal.module.scss';

const Modal = ({name, description, selected, change, show, closeModal}) => {
    return(
        <div className={classes.ModalWrapper} style={{opacity: show ? '1': '0'}} >
            <div className={classes.ModalHeader}>
                <span onClick={closeModal}>
                    X
                </span>
            </div>
            <div className={classes.ModalContent}>
                <div className={classes.ModalBody}>
                    <h4>{name}</h4>
                    <p>{description}</p>
                </div>
                <div className={classes.ModalFooter}>
                    <button onClick={change} >{selected ? "Remove" : "Select"}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
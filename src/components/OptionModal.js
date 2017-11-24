import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.closeOptionModal}
        contentLabel="Selected option"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">The decision has been made!</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button button--block" onClick={props.closeOptionModal}>Close</button>
    </Modal>
);

export default OptionModal;
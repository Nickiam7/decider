import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.closeOptionModal}
        contentLabel="Selected"
    >
        <h3>This is what should do!</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.closeOptionModal}>Close Button</button>
    </Modal>
);

export default OptionModal;
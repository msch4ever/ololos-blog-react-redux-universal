import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import ModalBody from 'react-bootstrap/lib/ModalBody'

const ModalLoading = ({ show, onClose, error }) => (
  <Modal show={show} onHide={onClose}>
    <ModalHeader closeButton>
      <ModalTitle>Такс-такс-такс, что тут у нас</ModalTitle>
    </ModalHeader>
    <ModalBody>
      Братишка, возникла ошибка!
      <br />
      {error.message}
    </ModalBody>
    <Modal.Footer>
      <button className="btn btn-danger" onClick={onClose}>
        Закрыть
      </button>
    </Modal.Footer>
  </Modal>
)

ModalLoading.propTypes = {
  error: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalLoading
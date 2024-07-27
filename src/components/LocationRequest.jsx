import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLocation } from '../reducer/userReducer';
import { Modal, ModalBody } from 'react-bootstrap';

const LocationRequest = ({ onClose }) => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.user.location);
  const error = useSelector(state => state.user.error);
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    // Dispatch the requestLocation action when the component mounts
    if (location == null) {
      dispatch(requestLocation());
    }
    else {
      setShowModal(false)
    }
  }, [dispatch]);

  useEffect(() => {
    // Close the modal when location is available or an error occurs
    if (location || error) {
      onClose();
    }
  }, [location, error, onClose]);

  return (
    <Modal show={showModal} onHide={onClose}>
      <ModalBody>
        <h2>Location Access Required</h2>
        <p>We need your location to provide better services.</p>
        {location && (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </ModalBody>
    </Modal>
  );
};

export default LocationRequest;

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default function Modal ({toggleModal, largeImage}) {
    useEffect(() => {
        const handleKeyDown = e => e.code === 'Escape' && toggleModal();
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleModal]);
    
    const handleBackdropClick = e => {
        e.target === e.currentTarget && toggleModal();
    };

    return (
            <div className={styles.Overlay} onClick={handleBackdropClick}>
                <div className={styles.Modal}>
                    <img src={largeImage} alt="" />
                </div>
            </div>
        )
}


Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
}
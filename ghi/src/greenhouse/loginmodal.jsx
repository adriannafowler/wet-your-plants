import React from 'react'
import Modal from 'react-modal'
import Button from '@mui/material/Button'

Modal.setAppElement('#root')

const LoginModal = ({ message, isOpen, onRequestClose, redirectTo }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Error Login Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust to center the modal exactly
                    width: '30%', // Set the width of the modal
                    height: '18%', // Set the height of the modal
                    backgroundColor: '#cfd6e0',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Align items at the bottom of the modal
                },
            }}
        >
            <div>
                <h3
                    style={{
                        fontFamily: 'Cupcakie',
                        fontSize: '50px',
                        color: '#79a6a3',
                        marginTop: '0px',
                        marginBottom: '0px',
                    }}
                >
                    {message}
                </h3>
            </div>
            <Button
                style={{
                    fontFamily: 'Cupcakie',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#79a6a3',
                    height: '50px',
                    width: '100%', // Full width button
                }}
                onClick={() => onRequestClose(redirectTo)}
            >
                OK
            </Button>
        </Modal>
    )
}

export default LoginModal

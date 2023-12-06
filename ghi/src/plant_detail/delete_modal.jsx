import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useParams } from 'react-router-dom'

const DeleteDialog = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false)
    const param = useParams()
    const plant_id = param.id

    useImperativeHandle(ref, () => ({
        showDialog() {
            setOpen(true)
        },
    }))

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/greenhouse/${plant_id}/`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Failed to delete the plant.')
            }
            console.log('Plant deleted successfully')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this plant?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose()
                            handleDelete()
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
})

export default DeleteDialog

import { FC } from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

interface iProps {
    cancelText?: string
    confirmText?: string
    onClickCancel: () => void,
    onClickConfirm: () => void,
    open: boolean
    title?: string
}

const ConfirmationModal: FC<iProps> = ({
    cancelText='Cancel',
    confirmText='Save',
    onClickCancel,
    onClickConfirm,
    open,
    title='Confirm?'
}) => {
    return (
        <Modal
            open={open}
        >
            <Box>
                <Typography variant='h3'>
                    {title}
                </Typography>
                <Box>
                    <Button onClick={onClickCancel} variant='outlined'>
                        {cancelText}
                    </Button>
                    <Button onClick={onClickConfirm} variant='contained'>
                        {confirmText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ConfirmationModal

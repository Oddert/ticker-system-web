import { FC } from 'react';

import { Box, Button, Dialog, Typography } from '@mui/material';

interface IProps {
    cancelText?: string;
    confirmText?: string;
    onClickCancel: () => void;
    onClickConfirm: () => void;
    open: boolean;
    title?: string;
}

const ConfirmationModal: FC<IProps> = ({
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onClickCancel,
    onClickConfirm,
    open,
    title = 'Confirm?',
}) => {
    return (
        <Dialog open={open}>
            <Box sx={{ p: '32px 64px', minWidth: '40vw' }}>
                <Typography variant="h3">{title}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gridGap: '16px',
                        mt: '32px',
                    }}
                >
                    <Button onClick={onClickCancel} variant="outlined">
                        {cancelText}
                    </Button>
                    <Button onClick={onClickConfirm} variant="contained">
                        {confirmText}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default ConfirmationModal;

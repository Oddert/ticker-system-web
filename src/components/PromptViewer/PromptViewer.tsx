import { FC } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import type { IPrompt } from '../../types/prompt';

import { createDateStr } from '../../utils/commonUtils';

interface IProps {
    open?: boolean;
    onClose: () => void;
    prompt: IPrompt;
}

const PromptViewer: FC<IProps> = ({ open = true, onClose, prompt }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{prompt.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Reminder for {createDateStr(new Date(prompt.date))}
                </DialogContentText>
                <DialogContentText variant='body2'>
                    Created on {createDateStr(new Date(prompt.createdOn))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    sx={(theme) => ({ color: theme.palette.text.primary })}
                    variant='outlined'
                >
                    Defer
                </Button>
                <Button onClick={onClose} variant='contained'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PromptViewer;

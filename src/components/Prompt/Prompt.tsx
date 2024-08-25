import { FC, Fragment, useState } from 'react';

import { Button, Typography } from '@mui/material';

import type { IPrompt } from '../../types/prompt';

import PromptViewer from '../PromptViewer';

interface IProps {
    prompt: IPrompt;
}

const Prompt: FC<IProps> = ({ prompt }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>
            <Button
                onClick={handleOpen}
                sx={(theme) => ({
                    alignItems: 'flex-start',
                    color: theme.palette.text.primary,
                    background: theme.palette.secondary.main,
                    padding: '16px 24px',
                    justifyContent: 'flex-start',
                    width: '40vw',
                    mb: '16px',
                })}
            >
                <Typography variant='h4'>{prompt.title}</Typography>
            </Button>
            <PromptViewer open={open} onClose={handleClose} prompt={prompt} />
        </Fragment>
    );
};

export default Prompt;

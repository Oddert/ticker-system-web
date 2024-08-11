import { FC } from 'react';

import { Button, Typography } from '@mui/material';

import type { iPrompt } from '../../types/prompt';

interface iProps {
    prompt: iPrompt
}

const Prompt: FC<iProps> = ({ prompt }) => {
    return (
        <Button sx={(theme) => ({
            alignItems: 'flex-start',
            color: theme.palette.text.primary,
            background: theme.palette.secondary.main,
            padding: '16px 24px',
            justifyContent: 'flex-start',
            width: '40vw',
        })}>
            <Typography variant='h4'>{prompt.title}</Typography>
        </Button>
    )
}

export default Prompt

import { FC, Fragment, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Button } from '@mui/material';
import {
    Add as CreateIcon,
} from '@mui/icons-material';

import type { iPrompt } from '../../types/prompt';

import EditPromptModal from '../EditPromptModal';

interface iProps {
    buttonText?: string
    prompt: iPrompt
}

export interface iState {
    title: string,
    date: Dayjs,
    deferQuantity: string,
    deferPeriod: 'days' | 'weeks' | 'months',
}

const EditPrompt: FC<iProps> = ({
    buttonText='Create prompt',
    prompt,
}) => {
    const [open, setOpen] = useState(false)

    const handleSave = () => {
        console.log('SAVE!')
    }

    const handleClickOpen = () => setOpen(true)

    return (
        <Fragment>
            <Button onClick={handleClickOpen}>
                <CreateIcon />{' '}
                {buttonText}
            </Button>
            <EditPromptModal
                initialState={{
                    title: prompt.title,
                    date: dayjs(prompt.date),
                    deferQuantity: prompt.defaultDeferQuantity,
                    deferPeriod: prompt.defaultDeferPeriod,
                }}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                open={open}
            />
        </Fragment>
    )
}

export default EditPrompt

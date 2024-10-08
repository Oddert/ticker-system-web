import { FC, Fragment, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Button } from '@mui/material';
import { Add as CreateIcon } from '@mui/icons-material';

import type { IPrompt } from '../../types/prompt';

import EditPromptModal from '../EditPromptModal';

interface IProps {
    buttonText?: string;
    prompt: IPrompt;
}

export interface IState {
    title: string;
    date: Dayjs;
    deferQuantity: string;
    deferPeriod: 'days' | 'weeks' | 'months';
}

const EditPrompt: FC<IProps> = ({ buttonText = 'Create prompt', prompt }) => {
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        console.log('SAVE!');
    };

    const handleClickOpen = () => setOpen(true);

    return (
        <Fragment>
            <Button onClick={handleClickOpen}>
                <CreateIcon /> {buttonText}
            </Button>
            <EditPromptModal
                initialState={{
                    title: prompt.title,
                    date: dayjs(prompt.date),
                    deferQuantity: prompt.deferQuantity,
                    deferPeriod: prompt.deferPeriod,
                }}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                open={open}
            />
        </Fragment>
    );
};

export default EditPrompt;

import { FC, Fragment, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Button } from '@mui/material';
import { Add as CreateIcon } from '@mui/icons-material';

import EditPromptModal from '../EditPromptModal';

interface IProps {
    buttonText?: string;
}

export interface IState {
    title: string;
    date: Dayjs;
    deferQuantity: string;
    deferPeriod: 'days' | 'weeks' | 'months';
}

const CreatePrompt: FC<IProps> = ({ buttonText = 'Create prompt' }) => {
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
                onClose={() => setOpen(false)}
                onSave={handleSave}
                open={open}
            />
        </Fragment>
    );
};

export default CreatePrompt;

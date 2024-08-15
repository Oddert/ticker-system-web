import { FC, Fragment, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import {
    Box,
    Button,
    Dialog,
    Typography,
} from '@mui/material';
import {
    Add as CreateIcon,
} from '@mui/icons-material';

import ConfirmationModal from '../ConfirmationModal';
import Title from './components/Title';
import DateInput from './components/DateInput';
import Deferral from './components/Deferral/Deferral';

interface iProps {
    buttonText?: string
}

export interface iState {
    title: string,
    date: Dayjs,
    deferQuantity: string,
    deferPeriod: 'days' | 'weeks' | 'months',
}

const initialDate = dayjs()

const CreatePrompt: FC<iProps> = ({
    buttonText='Create prompt',
}) => {
    const [open, setOpen] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const [state, setState] = useState<iState>({
        title: '',
        date: initialDate,
        deferQuantity: '2',
        deferPeriod: 'days'
    })

    const handleSave = () => {
        console.log('SAVE!')
    }

    const resetState = () => {
        setState({
            title: '',
            date: initialDate,
            deferQuantity: '2',
            deferPeriod: 'days',
        })
    }

    const handleClose = () => {
        if (
            state.title !== '' ||
            initialDate.diff(state.date) ||
            state.deferQuantity !== '2' ||
            state.deferPeriod !== 'days'
        ) {
            setConfirm(true)
        } else {
            resetState()
            setOpen(false)
            setConfirm(false)
        }
    }
    
    const handleClickConfirm = () => {
        resetState()
        setOpen(false)
        setConfirm(false)
    }

    const handleClickOpen = () => setOpen(true)
    const handleClickCancel = () => setConfirm(false)

    return (
        <Fragment>
            <Button onClick={handleClickOpen}>
                <CreateIcon />{' '}
                {buttonText}
            </Button>
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <Box sx={{ p: '32px 64px' }}>
                    <Typography variant='h3'>Create new prompt</Typography>
                    <Title title={state.title} setState={setState} />
                    <DateInput setState={setState} />
                    <Deferral
                        deferPeriod={state.deferPeriod}
                        deferQuantity={state.deferQuantity}
                        setState={setState}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gridGap: '16px',
                        }}
                    >
                        <Button onClick={handleClose} variant='text'>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant='contained'>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog>
            <ConfirmationModal
                cancelText='Go back'
                confirmText='Discard changes'
                onClickCancel={handleClickCancel}
                onClickConfirm={handleClickConfirm}
                open={confirm}
                title='Discard changes?'
            />
        </Fragment>
    )
}

export default CreatePrompt

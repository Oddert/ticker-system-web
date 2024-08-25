import { FC, Fragment, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import {
    Box,
    Button,
    Dialog,
    Typography,
} from '@mui/material';

import type { iPrompt } from '../../types/prompt';

import Title from './components/Title';
import DateInput from './components/DateInput';
import Deferral from './components/Deferral';

import ConfirmationModal from '../ConfirmationModal';

export interface iState {
    title: string
    date: Dayjs
    deferQuantity: number
    deferPeriod: iPrompt['deferPeriod']
}

interface iProps {
    initialState?: Partial<iState>
    onClose: () => void
    onSave: (state: iState) => void
    open: boolean
}

const initialDate = dayjs()

const EditPromptModal: FC<iProps> = ({
    initialState,
    onClose,
    onSave,
    open,
}) => {
    const [confirm, setConfirm] = useState(false)

    const [state, setState] = useState<iState>({
        title: '',
        date: initialDate,
        deferQuantity: 2,
        deferPeriod: 'day'
    })

    useEffect(() => {
        if (initialState) {
            setState((_state) => ({
                title: initialState?.title || _state.title,
                date: initialState?.date || _state.date,
                deferQuantity: initialState?.deferQuantity || _state.deferQuantity,
                deferPeriod: initialState?.deferPeriod || _state.deferPeriod,
            }))
        }
    }, [initialState])

    const handleSave = () => {
        console.log('SAVE!')
        onSave(state)
    }

    const resetState = () => {
        setState({
            title: '',
            date: initialDate,
            deferQuantity: 2,
            deferPeriod: 'day',
        })
    }

    const handleClose = () => {
        if (
            state.title !== '' ||
            // initialDate.diff(state.date) ||
            state.deferQuantity !== 2 ||
            state.deferPeriod !== 'day'
        ) {
            setConfirm(true)
        } else {
            resetState()
            onClose()
            setConfirm(false)
        }
    }
    
    const handleClickConfirm = () => {
        resetState()
        onClose()
        setConfirm(false)
    }

    const handleClickCancel = () => setConfirm(false)

    return (
        <Fragment>
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

export default EditPromptModal

import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControlLabel,
    Input,
    Radio,
    RadioGroup,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { ExpandMore as ExpandIcon } from '@mui/icons-material';

import type { IPrompt } from '../../../../types/prompt';

import { IState } from '../../EditPromptModal';

interface IProps {
    deferPeriod: IPrompt['deferPeriod'];
    deferQuantity: number;
    setState: Dispatch<SetStateAction<IState>>;
}

const Deferral: FC<IProps> = ({ deferPeriod, deferQuantity, setState }) => {
    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target?.value) {
            setState((_state) => ({
                ..._state,
                deferQuantity: Number(event.target.value),
            }));
        }
    };

    const handleChangePeriod = (
        event: SelectChangeEvent<'days' | 'weeks' | 'months'>,
    ) => {
        setState((_state) => ({
            ..._state,
            deferPeriod: event.target.value as IState['deferPeriod'],
        }));
    };

    return (
        <Accordion
            defaultExpanded
            sx={{ background: 'transparent', boxShadow: 'none' }}
        >
            <AccordionSummary expandIcon={<ExpandIcon />}>
                Deferral
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    How long should the prompt be postponed if dismissed?
                </Typography>
                <Typography variant='body2'>
                    This is changeable at the point of deferral so you can
                    ignore it if you want.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Input
                        onChange={handleChangeQuantity}
                        type='number'
                        sx={{
                            width: '100px',
                        }}
                        value={deferQuantity}
                    />
                    <RadioGroup
                        onChange={handleChangePeriod}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        value={deferPeriod}
                    >
                        <FormControlLabel
                            value='days'
                            control={<Radio />}
                            label='Days'
                        />
                        <FormControlLabel
                            value='weeks'
                            control={<Radio />}
                            label='Weeks'
                        />
                        <FormControlLabel
                            value='months'
                            control={<Radio />}
                            label='Months'
                        />
                    </RadioGroup>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default Deferral;

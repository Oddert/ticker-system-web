import { Dispatch, FC, SetStateAction } from 'react';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { ExpandMore as ExpandIcon } from '@mui/icons-material';

import { IState } from '../../EditPromptModal';
import { Dayjs } from 'dayjs';

interface IProps {
    setState: Dispatch<SetStateAction<IState>>;
}

const DateInput: FC<IProps> = ({ setState }) => {
    const handleChange = (value: Dayjs | null) => {
        if (value) {
            setState((_state) => ({
                ..._state,
                date: value,
            }));
        }
    };

    return (
        <Accordion
            defaultExpanded
            sx={{ background: 'transparent', boxShadow: 'none' }}
        >
            <AccordionSummary expandIcon={<ExpandIcon />}>
                Date
            </AccordionSummary>
            <AccordionDetails>
                <StaticDatePicker
                    disablePast
                    displayStaticWrapperAs="desktop"
                    onChange={handleChange}
                    showDaysOutsideCurrentMonth
                    slotProps={{
                        toolbar: {
                            toolbarFormat: 'ddd DD MMMM',
                            hidden: false,
                        },
                    }}
                    sx={{
                        borderRadius: '4px',
                    }}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default DateInput;

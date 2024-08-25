import { FC, useEffect, useState } from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Typography,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Add as CreateIcon,
} from '@mui/icons-material';

import { monthLabelsLong } from '../../constants/appConstants';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';

import { getPromptsOrdered } from '../../redux/slices/prompt/prompt.selector';
import Prompt from '../../components/Prompt/Prompt';

const endOfMonth = new Date();
const today = new Date();
endOfMonth.setMonth(endOfMonth.getMonth() + 1);
endOfMonth.setDate(0);

const daysLeftInMonth = endOfMonth.getDate() - today.getDate() + 1;
const todayDateNumber = today.getDate();
const monthNumber = endOfMonth.getMonth();
const yearNumber = endOfMonth.getFullYear();

const createMonth = (date: Date) => {
    const endOfMth = new Date(date);
    endOfMth.setMonth(endOfMth.getMonth() + 1);
    endOfMth.setDate(0);
    return {
        yearNumber: date.getFullYear(),
        monthNumber: date.getMonth(),
        days: Array.from(
            { length: endOfMonth.getDate() - 1 },
            (_, idx) => idx + 1,
        ),
    };
};

const LookAhead: FC = () => {
    const [expanded, setExpanded] = useState(
        `panel-${yearNumber}-${monthNumber}-${todayDateNumber}`,
    );
    const [months, setMonths] = useState([
        {
            yearNumber: yearNumber,
            monthNumber: monthNumber,
            days: Array.from(
                { length: daysLeftInMonth },
                (_, idx) => idx + todayDateNumber,
            ),
        },
    ]);

    const orderedPrompts = useAppSelector(getPromptsOrdered);

    const handleChange = (panelName: string) => () => {
        if (expanded === panelName) {
            setExpanded('');
        } else {
            setExpanded(panelName);
        }
    };

    const handleClickNext = () => {
        const latestMonth = months[months.length - 1];
        const nextMonth = new Date(
            latestMonth.yearNumber,
            latestMonth.monthNumber,
            latestMonth.days[latestMonth.days.length - 1],
        );
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setMonths([...months, createMonth(nextMonth)]);
    };

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);

    return (
        <Container
            sx={{
                p: '24px 64px 0 64px',
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
        >
            {months.map((month, monthIdx) => {
                return month.days.map((day, dayIdx) => {
                    const prompts =
                        orderedPrompts?.[month.yearNumber]?.[
                            month.monthNumber
                        ]?.[day] || [];
                    const slug = `panel-${month.yearNumber}-${month.monthNumber}-${day}`;
                    const open = expanded === slug;
                    return (
                        <Accordion
                            expanded={open}
                            key={slug}
                            onChange={handleChange(slug)}
                            sx={{
                                boxShadow:
                                    'inset -1px -10px 13px -8px rgba(0,0,0,0.35)',
                                '&.Mui-expanded': {
                                    margin: 0,
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-${day}-content`}
                                id={`panel-${day}-header`}
                                sx={
                                    {
                                        // margin: 0,
                                        // padding: '12px 0',
                                    }
                                }
                            >
                                <Typography>
                                    {day} {monthLabelsLong[month.monthNumber]}
                                </Typography>
                                {prompts.length && !open ? (
                                    <Box
                                        title={`${prompts.length} ${
                                            prompts.length > 1
                                                ? 'prompts'
                                                : 'prompt'
                                        } for this day`}
                                        sx={(theme) => ({
                                            ml: '8px',
                                            width: '40vw',
                                            background:
                                                theme.palette.secondary.main,
                                            height: '30px',
                                            alignSelf: 'flex-end',
                                            position: 'relative',
                                            bottom: '-12px',
                                            margin: '0 auto',
                                            boxShadow:
                                                'inset -1px -10px 13px -8px rgba(0,0,0,0.55)',
                                        })}
                                    />
                                ) : null}
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight:
                                        monthIdx === 0 && dayIdx === 0
                                            ? '40vh'
                                            : 'auto',
                                }}
                            >
                                {prompts.map((prompt, promptIdx) => (
                                    <Prompt key={promptIdx} prompt={prompt} />
                                ))}
                                <Button
                                    sx={
                                        {
                                            // width: '100px'
                                        }
                                    }
                                >
                                    <CreateIcon /> Create
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    );
                });
            })}
            <Button onClick={handleClickNext}>Load next month</Button>
        </Container>
    );
};

export default LookAhead;

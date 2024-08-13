import { FC, Fragment } from 'react';

import { Box, Container, darken, lighten, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';

import { getPromptsOrdered } from '../../redux/slices/prompt/prompt.selector';

import Prompt from '../../components/Prompt/Prompt';
import { monthLabelsLong } from '../../constants/appConstants';

const monthColours = [
    '#d32f2f',
    '#ff9800',
    '#64b5f6',
    '#8638d6',
    '#81c784',
    '#2196f3',
    '#591e94',
    '#4caf50',
    '#591e94',
    '#ffb74d',
    '#f44336',
    '#388e3c',
]

const AllPrompts: FC = () => {
    const prompts = useAppSelector(getPromptsOrdered)
    return (
        <Container
            sx={{
                p: '24px 64px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gridAutoRows: 'auto',
            }}
        >
            {Object.entries(prompts).map(
                ([yearKey, yearValue], yearIdx) => {
                    return (
                        <Fragment key={yearIdx}>
                            <Box
                                sx={{
                                    height: '64px',
                                    display: 'flex',
                                    padding: 2,
                                    gridColumn: 2,
                                }}
                            >
                                <Typography variant='h2'>{yearKey}</Typography>
                            </Box>
                            {Object.entries(yearValue).map(
                                ([monthKey, monthValue], monthIdx) => {
                                    const colour = monthColours[Number(monthKey)]
                                    return (
                                        <Fragment key={monthIdx}>
                                            <Box
                                                sx={(theme) => ({
                                                    height: '100px',
                                                    background: `linear-gradient(10deg, ${lighten(colour, .7)}, ${darken(colour, .5)})`,
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    px: 6,
                                                    py: 3,
                                                    my: 2,
                                                    borderRadius: '8px',
                                                    color: theme.palette.common.black,
                                                    gridColumn: 2,
                                                })}
                                            >
                                                <Typography variant='h3'>
                                                    {monthLabelsLong[Number(monthKey)]}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                sx={(theme) => ({
                                                    background: theme.palette.secondary.dark,
                                                    gridColumn: 1,
                                                    width: '64px',
                                                    position: 'sticky',
                                                    top: '64px',
                                                    fontSize: '24px',
                                                })}
                                            >
                                                {monthKey}
                                            </Typography>
                                            {monthValue.map(
                                                (prompt, promptIdx) => (
                                                    <Box
                                                        sx={{
                                                            gridColumn: 2,
                                                            display: 'flex',
                                                            justifyContent: 'flex-start',
                                                        }}
                                                    >
                                                        <Prompt
                                                            key={promptIdx}
                                                            prompt={prompt}
                                                        />
                                                    </Box>
                                                )
                                            )}
                                        </Fragment>
                                    )
                                }
                            )}
                        </Fragment>
                    )
                }
            )}
        </Container>
    )
}

export default AllPrompts

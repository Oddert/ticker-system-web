import { FC, Fragment } from 'react';

import {
    Box,
    Container,
    darken,
    lighten,
    Typography,
    useTheme,
} from '@mui/material';

import { monthLabelsLong } from '../../constants/appConstants';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';

import { getPromptsOrdered } from '../../redux/slices/prompt/prompt.selector';

import Prompt from '../../components/Prompt/Prompt';

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
];

const AllPrompts: FC = () => {
    const prompts = useAppSelector(getPromptsOrdered);
    const theme = useTheme();
    return (
        <Container
            sx={{
                p: '24px 64px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gridAutoRows: 'auto',
            }}
        >
            {Object.entries(prompts).map(([yearKey, yearValue], yearIdx) => {
                return (
                    <Fragment key={yearIdx}>
                        <Box
                            sx={{
                                height: '64px',
                                display: 'flex',
                                padding: 2,
                                gridColumn: 2,
                                position: 'sticky',
                                top: '64px',
                                zIndex: 1,
                                background: theme.palette.secondary.dark,
                            }}
                        >
                            <Typography variant="h2">{yearKey}</Typography>
                        </Box>
                        {Object.entries(yearValue).map(
                            ([monthKey, monthValue], monthIdx) => {
                                const colour = monthColours[Number(monthKey)];
                                return (
                                    <Fragment key={monthIdx}>
                                        <Box
                                            sx={(_theme) => ({
                                                height: '100px',
                                                background: `linear-gradient(10deg, ${lighten(colour, 0.7)}, ${darken(colour, 0.5)})`,
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                px: 6,
                                                py: 3,
                                                my: 2,
                                                borderRadius: '8px',
                                                color: _theme.palette.common
                                                    .black,
                                                gridColumn: 2,
                                            })}
                                        >
                                            <Typography variant="h3">
                                                {
                                                    monthLabelsLong[
                                                        Number(monthKey)
                                                    ]
                                                }
                                            </Typography>
                                        </Box>
                                        <Typography
                                            sx={(_theme) => ({
                                                background:
                                                    _theme.palette.secondary
                                                        .dark,
                                                gridColumn: 1,
                                                padding: 2,
                                                width: '64px',
                                                position: 'sticky',
                                                top: '64px',
                                                fontSize: '24px',
                                            })}
                                        >
                                            {monthKey}
                                        </Typography>
                                        {Object.values(monthValue).map((day) =>
                                            day.map((prompt, promptIdx) => (
                                                <Box
                                                    key={promptIdx}
                                                    sx={{
                                                        gridColumn: 2,
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-start',
                                                    }}
                                                >
                                                    <Prompt
                                                        key={promptIdx}
                                                        prompt={prompt}
                                                    />
                                                </Box>
                                            )),
                                        )}
                                    </Fragment>
                                );
                            },
                        )}
                    </Fragment>
                );
            })}
        </Container>
    );
};

export default AllPrompts;

import React, { useMemo } from 'react'

import { Box, Container, Typography } from '@mui/material'

import PlantImage from '../../assets/placeholder-plant.png'

import { useAppSelector } from '../../hooks/ReduxHookWrappers'

import { getPromptsOrdered } from '../../redux/slices/prompt/prompt.selector'

import { createDateStr } from '../../utils/commonUtils'
import Prompt from '../../components/Prompt/Prompt'

const dateStr = createDateStr(new Date())

const Home = () => {
    const orderedPrompts = useAppSelector(getPromptsOrdered)

    const todayPrompts = useMemo(() => {
        const today = new Date()
        const year = String(today.getFullYear())
        const month = String(today.getMonth())
        return orderedPrompts[year][month]
    }, [orderedPrompts])

    return (
        <Container
            sx={{
                p: '24px 64px',
                display: 'grid',
                gridTemplateColumns: '2fr 3fr',
                gridTemplateRows: 'auto 1fr',
                '& img': {
                    height: '100%',
                    maxHeight: '90vh',
                    width: '100%',
                    gridRow: '1 / -1',
                    gridColumn: '2',
                    filter: 'saturate(70%)'
                }
            }}
        >
            <Typography
                textAlign={'left'}
                sx={{
                    // gridColumn: '1 / -1',
                }}
                variant='h2'
            >
                {dateStr}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '64px 32px',
                    gridRow: '2',
                    gridColumn: '1',
                }}
            >
                {todayPrompts.map((prompt, idx) => <Prompt key={idx} prompt={prompt} />)}
            </Box>
            <img alt='' src={PlantImage} />
        </Container>
    )
}

export default Home

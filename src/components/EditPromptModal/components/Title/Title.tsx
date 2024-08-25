import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import { Box, Button, FormControlLabel, Input } from '@mui/material';
import { Close as ClearIcon } from '@mui/icons-material';

import { IState } from '../../EditPromptModal';

interface IProps {
    setState: Dispatch<SetStateAction<IState>>;
    title: string;
}

const Title: FC<IProps> = ({ setState, title }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((_state) => ({
            ..._state,
            title: event.target.value,
        }));
    };

    return (
        <Box
            sx={(theme) => ({
                width: '100%',
                background: theme.palette.secondary.main,
                borderRadius: '4px',
                my: 2,
                px: 2,
            })}
        >
            <FormControlLabel
                control={
                    <Input
                        autoFocus
                        fullWidth
                        endAdornment={
                            <Button
                                disabled={!title.length}
                                onClick={() =>
                                    setState((_state) => ({
                                        ..._state,
                                        title: '',
                                    }))
                                }
                                sx={{
                                    opacity: title.length ? 1 : 0,
                                }}
                                title='clear'
                            >
                                <ClearIcon />
                            </Button>
                        }
                        onChange={handleChange}
                        type='text'
                        value={title}
                    />
                }
                label='title'
                labelPlacement='top'
                sx={{
                    alignItems: 'flex-start',
                    m: '16px 0',
                    width: '100%',
                }}
            />
        </Box>
    );
};

export default Title;

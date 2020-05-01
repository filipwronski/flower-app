import React from 'react';
import { ThemeProvider, TextField } from '@material-ui/core';
import { basicTheme } from '../../ui-theme';

export default function BasicTextField(props) {
    
    return (
        <ThemeProvider theme={ basicTheme }>
            <TextField
                className={props.className}
                value={props.value}
                label={props.label}
                onChange={props.onChange}
                variant="outlined"
            />
        </ThemeProvider>
    );
}
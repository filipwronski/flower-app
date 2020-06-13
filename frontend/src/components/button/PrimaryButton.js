import React from 'react';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core';
import { basicTheme } from '../../ui-theme'

export default function PrimaryButton(props) {
    
    return (
        <ThemeProvider theme={ basicTheme }>
            <Button 
                variant="contained"
                className={props.className}
                onClick={props.onClick}
                color="primary"
                type="submit"
            >
                {props.children}
            </Button>
        </ThemeProvider>
    );
}
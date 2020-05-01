import React from 'react'
import { Box } from '@material-ui/core';

export default function ContentBox(props) {
    return (
        <Box component="div" px={1}>
            {props.children}
        </Box>
    )
}
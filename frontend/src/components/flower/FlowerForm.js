import React, { useState, useEffect } from 'react';
import BasicTextField from '../input/BasicTextField'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export default function FlowerForm(props) {
    const [name, setName] = useState(props.defaultData.name);
    const [created, setCreated] = useState(props.defaultData.created);
    const [lastWatering, setLastWatering] = useState(props.defaultData.lastWatering);
 
    useEffect(() => {
        if (typeof props.defaultData !== 'undefined') {
            setName(props.defaultData.name)
            setCreated(props.defaultData.created)
            setLastWatering(props.defaultData.lastWatering)
        }
    }, [props.defaultData, props.defaultData.name, props.defaultData.created, props.defaultData.lastWatering]);

    const useStyles = makeStyles((theme) => ({
        margin: {
            paddingBottom: theme.spacing(1),
        },
        textField: {
            width: '100%',
        },
    }));
    const classes = useStyles();

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                props.formAction({
                    name,
                    created,
                    lastWatering,
                })
            }}
            className={classes.root}
        >   
            <BasicTextField
                className={clsx(classes.margin, classes.textField)}
                value={name}
                onChange={event => setName(event.target.value)}
                label="name"
            />
            <BasicTextField
                className={clsx(classes.margin, classes.textField)}
                value={created}
                onChange={event => setCreated(event.target.value)}
                label="created"
            />
            <BasicTextField
                className={clsx(classes.margin, classes.textField)}
                value={lastWatering}
                onChange={event => setLastWatering(event.target.value)}
                label="last watering"
            />
            {props.submitButton}
        </form>
    );
}
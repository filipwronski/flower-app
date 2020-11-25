import React, { useState, useEffect } from 'react';
import BasicTextField from '../input/BasicTextField'
import { makeStyles } from '@material-ui/core/styles';
import DateInput from '../input/DateInput.js'
import clsx from 'clsx';
import Combobox from '../input/BasicCombobox';
import ImageForm from '../layout/ImageForm';


export default function FlowerForm(props) {
    const useStyles = makeStyles((theme) => ({
        margin: {
            paddingBottom: theme.spacing(1),
        },
        textField: {
            width: '100%',
        },
    }));
    const classes = useStyles();
    const [name, setName] = useState(props.defaultData.name);
    const [created, setCreated] = useState(props.defaultData.created);
    const [lastWatering, setLastWatering] = useState(props.defaultData.lastWatering);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const flowerCategoryList = [
        {
            value: 'test1'
        },
        {
            value: 'test2'
        },
        {
            value: 'test3'
        }
    ]

    const onImageSelect = (image, validity) => {
        console.log(validity.valid)
        if (validity.valid) {
          setImageName(`flower-${Date.now() + '-' + Math.round(Math.random() * 1E9)}.jpg`)
          setImage(image)
        }
      }
 
    useEffect(() => {
        if (typeof props.defaultData !== 'undefined') {
            setName(props.defaultData.name)
            setCreated(props.defaultData.created)
            setLastWatering(props.defaultData.lastWatering)
        }
    }, [props.defaultData, props.defaultData.name, props.defaultData.created, props.defaultData.lastWatering]);


    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                props.formAction({
                    name,
                    created,
                    lastWatering,
                    image,
                    imageName,
                })
            }}
            className={classes.root}
        >   
            <BasicTextField
                className={clsx(classes.margin, classes.textField)}
                value={name}
                onChange={event => setName(event.target.value)}
                label="Flower name"
            />
            <Combobox
                label="Flower category"
                data={flowerCategoryList}
                newValuePrefix='Add new category'
                className={clsx(classes.margin)}
            />
            <Combobox
                label="Room"
                data={flowerCategoryList}
                newValuePrefix='Add new room'
                className={clsx(classes.margin)}
            />
            <ImageForm  onImageSelect={onImageSelect}/>
            <DateInput
                label="Created date"
                className={clsx(classes.textField)}
                variant="outlined"
                onChange={date => setCreated(date)}
            />
            <DateInput
                label="Last watering date"
                className={clsx(classes.textField)}
                variant="outlined"
                onChange={date => setLastWatering(date)}
            />  
            {props.submitButton}
        </form>
    );
}
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  combobox: {
      width: '100%',
  },
}));
const filter = createFilterOptions();

export default function Combobox(props) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const isInSuggestions = (value) => {
    return props.data.find((suggestion) => suggestion.name === value)
  }

  const getSuggestionListWithNewSuggestion = (suggestionList, inputValue) =>  {
    if (inputValue !== '' && !isInSuggestions(inputValue)) {
      suggestionList.push({
        inputValue,
        name: `${props.newValuePrefix} "${inputValue}"`,
      });
    }

    return suggestionList
  }

  const getSuggestionLabel = (suggestion) => {
    // Value selected with enter, right from the input
        if (typeof suggestion === 'string') {
          return suggestion;
        }
        // Add "xxx" option created dynamically
        if (suggestion.inputValue) {
          return suggestion.inputValue;
        }
        // Regular option
        return suggestion.name;
  }

  const getSuggestionList = (options, params) => {
    let suggestionList = filter(options, params);
        suggestionList = getSuggestionListWithNewSuggestion(suggestionList, params.inputValue)

        return suggestionList;
  }

  const onChange = (newValue) =>  {
    if (typeof newValue === 'string') {
      setSelectedValue({
        name: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      setSelectedValue({
        name: newValue.inputValue,
      });
    } else {
      setSelectedValue(newValue);
    }
  }

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        onChange(newValue)
      }}
      filterOptions={(options, params) => {
        return getSuggestionList(options, params)
      }}
      className={clsx(classes.combobox, props.className)}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={props.data}
      getOptionLabel={(suggestion) => getSuggestionLabel(suggestion)}
      renderOption={(suggestion) => suggestion.name}
      freeSolo
      renderInput={(params) => (  
        <TextField {...params} label={props.label} variant="outlined" />
      )}
    />
  );
}
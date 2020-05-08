import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Select,
  Switch,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText,
  Paper
} from '@material-ui/core';
import {
  DatePicker,
  KeyboardDatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {SingleSelect} from 'react-select-material-ui';

import {makeStyles} from '@material-ui/styles';

import {useForm, Controller} from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  form: {
    marginLeft: 100,
    marginRight: 100,
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(3)
  }
}));

export const renderFields = (form, control, errors, row) => {
  return form.map((field, index) => {
    if (
      field.type === 'text' ||
      field.type === 'password' ||
      field.type === 'tel'
    ) {
      return (
        <FormControl
          key={index}
          fullWidth
          margin="normal"
          error={Boolean(errors[field.name])}>
          <Controller
            as={TextField}
            type={field.type}
            control={control}
            required={field.rules ? true : false}
            name={field.name ? field.name : field.code}
            defaultValue={row ? row[field.name] : ""}
            label={field.placeholder}
            rules={field.rules}
          />
          <FormHelperText>
            {errors[field.name] && errors[field.name].message}
          </FormHelperText>
        </FormControl>
      );
    }
    if (field.type === 'number') {
      return (
        <FormControl
          key={index}
          fullWidth
          margin="normal"
          error={Boolean(errors[field.name])}>
          <Controller
            as={TextField}
            type={"number"}
            control={control}
            required={field.rules ? true : false}
            name={field.name ? field.name : field.code}
            defaultValue={row ? row[field.name] : ""}
            label={field.placeholder}
            rules={field.rules}
          />
          <FormHelperText>
            {errors[field.name] && errors[field.name].message}
          </FormHelperText>
        </FormControl>
      );
    }
    if (field.type === 'list'){

    }
    if (field.type === 'date') {
      return (
        <FormControl
          key={index}
          fullWidth
          margin="normal"
          error={Boolean(errors[field.name])}>
          <Controller
            as={DatePicker}
            format="DD-MM-YYYY"
            control={control}
            required={field.rules ? true : false}
            name={field.name}
            defaultValue={row ? row[field.name] : new Date()}
            label={field.placeholder}
            rules={field.rules}
            InputLabelProps={{
              shrink: true
            }}
          />
          <FormHelperText>
            {errors[field.name] && errors[field.name].message}
          </FormHelperText>
        </FormControl>
      );
    }
    if (field.type === 'select' || field.type === 'list') {
      return (
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors[field.name])}
          key={index}>
          <Controller
            as={SingleSelect}
            name={field.name}
            defaultValue={row ? row[field.name] : ""}
            rules={field.rules}
            control={control}
            options={field.options}
            label={field.placeholder}
          />
          <FormHelperText>
            {errors[field.name] && errors[field.name].message}
          </FormHelperText>
        </FormControl>
      );
    }
    if (field.type === 'boolean') {
      return (
        <FormControl fullWidth margin="normal" key={index}>
          <FormControlLabel
            control={
              <Controller
                as={Switch}
                name={field.name}
                defaultValue={row ? row[field.name] : true}
                control={control}
              />
            }
            label={field.placeholder}
          />
        </FormControl>
      );
    }
    return null;
  })
}

export default ({form, style, title, row, onSubmit, submitText, isLoading, extraFieldsTop, extraFieldsBottom}) => {
  const {handleSubmit, control, errors} = useForm();
  const classes = useStyles();

  return (
    <Paper className={style ? style : classes.form}>
      <form>
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
        {
          extraFieldsTop && extraFieldsTop(control, errors)
        }
        {
          renderFields(form, control, errors, row)
        }
        {
          extraFieldsBottom && extraFieldsBottom(control, errors)
        }
        <Button
          className={classes.submitButton}
          fullWidth
          onClick={handleSubmit(onSubmit)}
          color="secondary"
          disabled={Boolean(isLoading)}
          variant="outlined">
          {submitText ? submitText : 'OK'}
        </Button>
      </form>
    </Paper>
  );
};

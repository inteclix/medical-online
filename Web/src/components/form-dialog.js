import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import { makeStyles } from '@material-ui/core/styles';

import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';

import { useApi } from "../hooks/use-api";


export default function ({ onClose, open, row, url, form }) {
  const { api } = useApi()
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm();
  const { handleSubmit, control, errors } = methods;

  const onSubmit = (data) => {
    if (row) {
      api.put(url + "/" + row.id, data)
        .then(({ data }) => {
          enqueueSnackbar("L'operation terminé", {
            variant: 'success',
          });
          onClose({ shouldFetch: true }) // pass true to indicate modification is hapen
        })
        .catch((err) => {
          enqueueSnackbar("L'opération est échoué " + err, {
            variant: 'error',
          });
        })
    } else {
      api.post(url, data)
        .then(({ data }) => {
          enqueueSnackbar("L'operation terminé", {
            variant: 'success',
          });
          onClose({ shouldFetch: true }) // pass true to indicate modification is hapen
        })
        .catch((err) => {
          enqueueSnackbar("L'opération est échoué " + err, {
            variant: 'error',
          });
        })
    }
  }
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{row ? "Modifier" : "Ajouter"} un utilisateur</DialogTitle>
      <DialogContent>
        {
          form.map((field, index) => {
            if (field.type === "text" || field.type === "password" || field.type === "tel") {
              return (
                <FormControl
                  key={index}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors[field.name])}
                >
                  <Controller
                    as={TextField}
                    type={field.type}
                    control={control}
                    required={field.rules ? true : false}
                    name={field.name}
                    defaultValue={row ? row[field.name] : ""}
                    label={field.placeholder}
                    rules={field.rules}
                  />
                  <FormHelperText>
                    {errors[field.name] && errors[field.name].message}
                  </FormHelperText>
                </FormControl>
              )
            }
            if (field.type === "select") {
              return (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={Boolean(errors[field.name])}
                  key={index}
                >
                  <InputLabel>
                    {field.placeholder}
                  </InputLabel>
                  <Controller
                    as={
                      <Select>
                        {field.items.map((item, index) => (
                          <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    }
                    name={field.name}
                    defaultValue={row ? row[field.name] : ""}
                    rules={field.rules}
                    control={control}
                  />
                  <FormHelperText>
                    {errors[field.name] && errors[field.name].message}
                  </FormHelperText>
                </FormControl>
              )
            }
            if (field.type === "boolean") {
              return (
                <FormControl
                  fullWidth
                  margin="normal"
                  key={index}
                >
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
              )
            }
            return null
          })
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
         </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
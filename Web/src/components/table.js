import React, { useState, useEffect, useCallback } from "react";
import MaterialTable, { MTableToolbar } from 'material-table'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { useApi } from "../hooks/use-api";
import Form from "./form-dialog"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  addButton: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

export default function ({ tableName, columns, form, url }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([])
  const [row, setRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const { api } = useApi()

  const handleClickOpen = (row) => {
    setRow(row)
    setOpen(true);
  };

  const handleClose = ({ shouldFetch }) => {
    setOpen(false);
    setRow(null)
    if (shouldFetch) {
      fetchData()
    }
  };
  const fetchData = useCallback(() => {
    api.get(url)
      .then(({ data }) => {
        setData(data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        enqueueSnackbar("L'opération est échoué " + err, {
          variant: 'error',
        });
        setIsLoading(false)
      })
  }, [api, url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className={classes.root}>
      <MaterialTable
        title=""
        isLoading={isLoading}
        components={{
          Toolbar: props => (
            <div>
              <div className={classes.addButton}>
                <Typography variant="h5" gutterBottom>Table des {tableName + "s"}</Typography>
                <Button
                  onClick={() => handleClickOpen(null)} // pass null to indicate new row
                  color="default"
                  startIcon={<AddIcon />}
                >
                  Nauveau {tableName}
                </Button>
              </div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'Aucun element trouvé'
          },
          toolbar: {
            searchTooltip: 'Rechercher',
            searchPlaceholder: 'Rechercher ...'
          }
        }}
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Modifier',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Supprimer',
            onClick: (event, rowData) => {
              window.confirm("Supprimer " + columns[0].title + " : " + rowData[columns[0].field] + " ?") && api.delete(url + "/" + rowData.id)
                .then((res) => {
                  fetchData()
                  enqueueSnackbar("L'operation terminé", {
                    variant: 'success',
                  });
                })
                .catch((err) => {
                  enqueueSnackbar("L'opération est échoué " + err, {
                    variant: 'error',
                  });
                })
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
      <Form row={row} url={url} form={form} open={open} onClose={handleClose} />
    </div>
  )
}
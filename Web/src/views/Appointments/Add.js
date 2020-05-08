import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import AppContext from '../../contexts/app-context';
import { LayoutWithBack } from '../../layouts';
import Form from '../../components/Form';

const patientRow = null;
export default props => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { api } = useContext(AppContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const patientForm = [
    {
      name: 'firstname',
      placeholder: 'Firstname',
      type: 'text',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'lastname',
      placeholder: 'Lastname',
      type: 'text',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'mobile',
      placeholder: 'Tel mobile',
      type: 'text',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'birthDate',
      placeholder: 'Date of birth',
      type: 'date',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'gender',
      placeholder: 'Gender',
      type: 'select',
      options: [
        { label: 'Man', value: 'man' },
        { label: 'Woman', value: 'woman' }
      ],
      rules: { required: 'Ce champ est obligatoire' }
    }
  ];

  const onSubmit = data => {
    setIsLoading(true);
    api
      .post('/patients/appointments', data)
      .then(() => {
        const message = 'Patient created with pending appointment';
        enqueueSnackbar(message, {
          variant: 'success'
        });
        history.push("/appointments")
        setIsLoading(false);

      })
      .catch(err => {
        const message = err?.response?.data?.message || '' + err;
        enqueueSnackbar(message, {
          variant: 'error'
        });
        setIsLoading(false);
      });
  };

  return (
    <LayoutWithBack>
      <Form
        form={patientForm}
        title={t('Add Appointment')}
        row={patientRow}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </LayoutWithBack>
  );
};

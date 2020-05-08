import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import AppContext from '../../contexts/app-context';
import { LayoutWithBack } from '../../layouts';
import Form from '../../components/Form';

export default props => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { api } = useContext(AppContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const rowForm = [
    {
      name: 'firstname',
      placeholder: 'Nom',
      type: 'text',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'lastname',
      placeholder: 'Prénom',
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
      name: 'tel',
      placeholder: 'Tel fix',
      type: 'text',
    },
    {
      name: 'email',
      placeholder: 'Email',
      type: 'text',
    },
    {
      name: 'dateBirth',
      placeholder: 'Date de naissance',
      type: 'date',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'placeBirth',
      placeholder: 'Lieu de naissance',
      type: 'text',
      rules: { required: 'Ce champ est obligatoire' }
    },
    {
      name: 'gender',
      placeholder: 'Sexe',
      type: 'select',
      options: [
        { label: 'Home', value: 'man' },
        { label: 'Female', value: 'woman' }
      ],
      rules: { required: 'Ce champ est obligatoire' }
    },
    ,
    {
      name: 'civilState',
      placeholder: 'État civile',
      type: 'select',
      options: [
        { label: 'Célibataire', value: 'single' },
        { label: 'Marié(e)', value: 'married' },
        { label: 'Dévorcé(e)', value: 'divorced' },
        { label: 'Veuf(ve)', value: 'widower' },
      ],
      rules: { required: 'Ce champ est obligatoire' }
    }
  ];

  const onSubmit = data => {
    setIsLoading(true);
    api
      .post('/patients', data)
      .then(() => {
        const message = 'Patient created with pending appointment';
        enqueueSnackbar(message, {
          variant: 'success'
        });
        setIsLoading(false);
        history.push("/patients")
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
        form={rowForm}
        title={t('Add Patient')}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </LayoutWithBack>
  );
};

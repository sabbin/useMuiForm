import React, { useState, useMemo, useCallback } from 'react';
import { Button, TextField } from '@material-ui/core';

const useMuiForm = (
  initialFormDataValue = {},
  initalFormProps = {
    fields: [],
    props: {
      fields: {},
      submitButton: {}
    },
    handlers: {
      submit: () => false,
    }
  },
) => {
  const [formData, setFormData] = useState(initialFormDataValue);

  const updateValues = useCallback(({ target: { name, value, type, checked } }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: type !== 'chechbox' ? value : checked,
    }));
  }, []);

  const updateValuesParams = useCallback((name, value) =>
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    })), []);


  const formFields = useMemo(() => (
    initalFormProps.fields.map(item => (
      <TextField
        key={item.label}
        defaultValue={initialFormDataValue[item.name]}
        onChange={updateValues}
        {...item}
        {...initalFormProps.props.fields}
      />
    ))
  ), [updateValues, initalFormProps, initialFormDataValue]);

  const submitForm = useCallback(e => {
    e.preventDefault();

    initalFormProps.handlers.submit(formData);
  }, [initalFormProps, formData]);

  const formProps = useMemo(() => ({
    onSubmit: submitForm
  }), [submitForm]);

  const submitButton = useMemo(() =>
      <Button
        type="submit"
        {...initalFormProps.props.submitButton}
      >
        Submit
      </Button>
    , [initalFormProps]);

  const form = useMemo(() =>
      <form {...formProps}>
        {formFields}
        {submitButton}
      </form>,
    [formFields, formProps, submitButton]
  );

  const api = useMemo(
    () => ({
      updateValues,
      updateValuesParams,
      setFormData,
      getFormFields: formFields,
    }),
    [updateValues, updateValuesParams, setFormData, formFields]
  );
  return [form, formData, api];
};

export default useMuiForm;

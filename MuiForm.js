import React, { useState, useMemo, useCallback } from 'react';
import { Button, TextField } from '@material-ui/core';

const useMuiForm = (
  initialFormDataValue = {},
  formInputs = { fields: [], props: {} },
  submitHandler = () => false,
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
    formInputs.fields.map(item => (
      <TextField
        key={item.label}
        defaultValue={initialFormDataValue[item.name]}
        onChange={updateValues}
        {...item}
        {...formInputs.props}
      />
    ))
  ), [updateValues, formInputs, initialFormDataValue]);

  const submitForm = useCallback(e => {
    e.preventDefault();

    submitHandler(formData);
  }, [submitHandler, formData]);

  const api = useMemo(
    () => ({
      updateValues,
      updateValuesParams,
      setFormData,
      formFields,
    }),
    [updateValues, updateValuesParams, setFormData, formFields]
  );

  const formProps = useMemo(() => ({
    onSubmit: submitForm
  }), [submitForm]);

  const form = useMemo(() =>
      <form {...formProps}>
        {formFields}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          Sign in
        </Button>
      </form>,
    [formFields, formProps]
  );

  return [form, formProps, api, formData];
};

export default useMuiForm;

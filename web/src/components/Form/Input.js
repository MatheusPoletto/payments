import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import { Alert } from 'react-bootstrap';

import './styles.css';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);
  return (
    <>

      <div className="form-group">
        {label && <label className="field-name" htmlFor={fieldName}>{label}</label>}
        
        <input className="field"
          ref={inputRef}
          id={fieldName}
          defaultValue={defaultValue}
          {...rest}
        />


        {error && 
        <Alert className="field-error" variant='warning'>
          {error}
        </Alert>}
        
      </div>

      
      
    </>
  );
}

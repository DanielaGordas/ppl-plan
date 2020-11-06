import React from 'react';
import { useForm  } from "react-hook-form";

const NewUserForm = props => {

    const { register, handleSubmit, errors} = useForm(props.initialFormState);

    const onSubmit = data => {
        props.addUser(data)
      }; 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Gender</label>
          <select name="gender" ref={register({required: true})}>
            <option></option>
            <option value="female">female</option>
            <option value="male">male</option>  
            <option value="other">other</option>
          </select>
          {errors.gender && <p>This field is required</p>}
          <label>Age</label>
          <select name="age" ref={register({required: true})}>
            <option></option>
            <option value="18-25">18-25</option>
            <option value="25-35">25-35</option>
            <option value="35-45">35-45</option>
            <option value="45-55">45-55</option>
            <option value="55+">55+</option>
          </select>
          {errors.age && <p>This field is required</p>}
          <label>Postal Code</label>
          <input name="postal_code" ref={register({ required: true, pattern: /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/ })} />
          {errors.postal_code && <p>This field is required</p>}
          <input type="submit" className="Btn" />

        </form>
    );
    
}

export default NewUserForm;
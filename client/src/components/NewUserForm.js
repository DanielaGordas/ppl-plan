import React from 'react';
import { useForm  } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const NewUserForm = props => {

    const { register, handleSubmit, errors} = useForm(props.initialFormState);
    let history = useHistory();

    const onSubmit = data => {
  
        props.addUser(data)

        history.push("/lowcarbon");
        
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
          <label>Post Code</label>
          <input name="postal_code" ref={register({ required: true, pattern: /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/ })} />
          {errors.postal_code && <p>Please provide a valid post code in the format <em>SE5 0EG</em></p>}
          <input type="submit" className="Btn" />

        </form>
    );
    
}

export default NewUserForm;
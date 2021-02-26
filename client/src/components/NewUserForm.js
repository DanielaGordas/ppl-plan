import React from 'react';
import { useForm } from "react-hook-form";
import classes from "../styles/pages/user.module.scss";
import "../styles/components/button.scss";

const NewUserForm = props => {

    const { register, handleSubmit, errors} = useForm(props.initialFormState);

    const onSubmit = data => {
        props.addUser(data)
        
      }; 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Gender</label>
          <select name="gender" placeholder="gender" className={classes.Select} ref={register({required: true})}>
            <option></option>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>  
            <option value="Prefer to self-describe">Prefer to self-describe</option>
            <option value="Prefer not to disclose">Prefer not to disclose</option>
          </select>
          {errors.gender && <p className={classes.Error}>Please choose one of the options</p>}
          <label>Age</label>
          <select name="age" className={classes.Select}  placeholder="Age" ref={register({required: true})}>
            <option></option>
            <option value="16-24">16-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
            <option value="65+">65+</option>
            <option value="Prefer not to disclose">Prefer not to disclose</option>
          </select>
          {errors.age && <p className={classes.Error}>Please select your current age group</p>}
          <label>Post code</label>
          <input name="postal_code" className={classes.TextField}  ref={register({ required: true, pattern: /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/ })} />
          {errors.postal_code && <p className={classes.Error}>Please provide a valid post code</p>}
          <input type="submit" className="Btn-border" />

        </form>
    );
    
}

export default NewUserForm;
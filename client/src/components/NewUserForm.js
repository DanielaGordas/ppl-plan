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
            <option value="prefer to self-describe">Prefer to self-describe</option>
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
          <label>Ethnicity</label>
          <select name="ethnicity" className={classes.Select}  placeholder="Ethnicity" ref={register({required: true})}>
            <option></option>
            <option value="White: English, Welsh, Scottish, Northern Irish or British">White: English, Welsh, Scottish, Northern Irish or British</option>
            <option value="White: Irish">White: Irish</option>
            <option value="White: Gypsy or Irish Traveller">White: Gypsy or Irish Traveller</option>
            <option value="Any other White background">Any other White background</option>
            <option value="Mixed: White and Black Caribbean">Mixed: White and Black Caribbean</option>
            <option value="Mixed: White and Black African">Mixed: White and Black African</option>
            <option value="Mixed: White and Asian">Mixed: White and Asian</option>
            <option value="Any other Mixed or Multiple ethnic background">Any other Mixed or Multiple ethnic background</option>
            <option value="Indian">Indian</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Bangladeshi">Bangladeshi</option>
            <option value="Chinese">Chinese</option>
            <option value="Any other Asian background">Any other Asian background</option>
            <option value="African">African</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Any other Black, African or Caribbean background">Any other Black, African or Caribbean background</option>
            <option value="Arab">Arab</option>
            <option value="Any other ethnic group">Any other ethnic group</option>
          </select>
          {errors.age && <p className={classes.Error}>Please select your ethnicity</p>}
          <label>Post code</label>
          <input name="postal_code" placeholder="e.g. SE5 0EG" className={classes.TextField}  ref={register({ required: true, pattern: /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/ })} />
          {errors.postal_code && <p className={classes.Error}>Please provide a valid post code</p>}
          <input type="submit" className="Btn-border" />

        </form>
    );
    
}

export default NewUserForm;
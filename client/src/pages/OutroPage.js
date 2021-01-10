import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import NavBar from '../components/NavBar';
import classes from '../styles/pages/outro.module.scss';
import styles from "../styles/pages/user.module.scss";
import axios from 'axios';

const OutroPage = () => {

  const initialFormState = {
    question1: '',
    question2: ''
  }

    // retrieves answers to final questions from Local Storage
    const question1 = JSON.parse(window.localStorage.getItem('question1'));
    const question2 = JSON.parse(window.localStorage.getItem('question2'));

    const [answer1, setAnswer1] = useState(question1  || "")
    const [answer2, setAnswer2] = useState(question1  || "")

    // saves the answers to final questions to Local Storage
    useEffect(() => {
        window.localStorage.setItem('question1', JSON.stringify(answer1));
    }, [answer1])

    useEffect(() => {
      window.localStorage.setItem('question2', JSON.stringify(answer2));
    }, [answer2])

  //retrieves the guest object from local storage
  // const guestDetails = JSON.parse(window.localStorage.getItem('guest'));

  const addQuestions = (q) => {

    const qs = require('qs');
 
    axios.post('/api/questions', qs.stringify(
      {
        question: {
          answer: q.question1,
          question: "Have you ever engaged with a policy consultation run by your council before?",
        },
      }))
      .then(res => 
          setAnswer1(res.data)
      )
      .catch(error => console.log(error))
    
      axios.post('/api/questions', qs.stringify(
        {
          question: {
            answer: q.question2,
            question: "Do you feel you have an opportunity to shape local climate policy?",
          },
        }))
        .then(res => 
            setAnswer2(res.data)
        )
        .catch(error => console.log(error))
  

  }

  

  const { register, handleSubmit, errors} = useForm(initialFormState);

  const onSubmit = data => {
      addQuestions(data)
      
    }; 


  return(
    <>
      <NavBar />
      <div className={classes.Container} >
          <div className={classes.Content}>
              <h1>Thank you for playing through the scenarios!</h1>

              { answer1 && answer2 ? 
                <h1>Thank you for your answers!</h1>
                :
                
                <form onSubmit={handleSubmit(onSubmit)}>
                <label>Have you ever engaged with a policy consultation run by your council before?</label>
                <input name="question1" className={styles.TextField}  ref={register({ required: true,})} />
                  {errors.question1 && <p className={styles.Error}>Please provide an answer</p>}
                <label>Do you feel you have an opportunity to shape local climate policy?</label>
                <input name="question2" className={styles.TextField}  ref={register({ required: true,})} />
                {errors.question2 && <p className={styles.Error}>Please provide an answer</p>}
                <input type="submit" className="Btn-border" />
              </form>
              }


              <p>We appreciate your feedback. Which improvements would you like to see?</p>
              <a className={classes.Link} href="https://forms.gle/f67hrPtsz9jZdDvYA">Leave some Feedback!</a>
          </div>
      </div>
    </>
  )
}

export default OutroPage;
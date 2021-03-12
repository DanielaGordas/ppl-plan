import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import NavBar from '../components/NavBar';
import classes from '../styles/pages/outro.module.scss';
import styles from "../styles/pages/user.module.scss";
import axios from 'axios';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon } from "react-share";

const OutroPage = () => {

  const initialFormState = {
    question1: '',
    question2: '',
    question3: ''
  }

    // retrieves answers to final questions from Local Storage
    const question1 = JSON.parse(window.localStorage.getItem('question1'));
    const question2 = JSON.parse(window.localStorage.getItem('question2'));
    const question3 = JSON.parse(window.localStorage.getItem('question3'));

    const [answer1, setAnswer1] = useState(question1  || "")
    const [answer2, setAnswer2] = useState(question2  || "")
    const [answer3, setAnswer3] = useState(question3  || "")


    // saves the answers to final questions to Local Storage
    useEffect(() => {
        window.localStorage.setItem('question1', JSON.stringify(answer1));
    }, [answer1])

    useEffect(() => {
      window.localStorage.setItem('question2', JSON.stringify(answer2));
    }, [answer2])

    useEffect(() => {
      window.localStorage.setItem('question3', JSON.stringify(answer3));
    }, [answer3])

  // retrieves the guest object from local storage
  const guestDetails = JSON.parse(window.localStorage.getItem('guest'));


  const addQuestions = (q) => {

    const qs = require('qs');

    if(guestDetails) {
      axios.post('/api/questions', qs.stringify(
        {
          question: {
            answer: q.question1,
            question: "Have you ever engaged with a policy consultation run by your council before?",
            guest_id: guestDetails.id,
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
              guest_id: guestDetails.id,
            },
          }))
          .then(res => 
              setAnswer2(res.data)
          )
          .catch(error => console.log(error))
  
        axios.post('/api/questions', qs.stringify(
          {
            question: {
              answer: q.question3,
              question: "What is your ethnicity?",
              guest_id: guestDetails.id,
            },
          }))
          .then(res => 
              setAnswer3(res.data)
          )
          .catch(error => console.log(error))
    }
  }
  

  
  const { register, handleSubmit, errors} = useForm(initialFormState);

  const onSubmit = data => {
      addQuestions(data)
    }; 
  
  const shareUrl = "https://game.peoplesplan.org/"


  return(
    <>
      <NavBar />
      
      <div className={classes.Container} >
        
          <div className={classes.Content}>
              { answer1 && answer2 && answer3 ? 
                <a href="https://peoplesplan.org/eco-toolkit/" className={classes.Toolkit}>Eco Toolkit</a>
                :
                <>
                  <h1>One last thing before you can unlock the Eco-Toolkit!</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>

                  <label>Have you ever engaged with a policy consultation run by your council before?</label>
                  <select name="question1" className={styles.TextField}  ref={register({ required: true,})} >
                    <option></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="I don't know">I don't know</option>
                  </select>
                  {errors.question1 && <p className={styles.Error}>Please provide an answer</p>}

                  <label>Do you feel you have an opportunity to shape local climate policy?</label>
                  <select name="question2" className={styles.TextField}  ref={register({ required: true,})} >
                    <option></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="I don't know">I don't know</option>
                  </select>
                  {errors.question2 && <p className={styles.Error}>Please provide an answer</p>}

                  <label>What is your ethnicity? <em>(optional)</em></label>
                  <select name="question3" className={styles.TextField}  ref={register()} >
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
                    <option value="I prefer to not disclose">I prefer to not disclose</option>
                  </select>
                  {errors.question3 && <p className={styles.Error}>Please provide an answer</p>}
                  <input type="submit" className="Btn-border" />
                </form>
              </>
              }

              <p>We appreciate your feedback. Which improvements would you like to see?</p>
              <a className={classes.Link} href="https://forms.glef67hrPtsz9jZdDvYA">Leave some Feedback</a>

              <div className={classes.Socials}> 
                <p>Share</p>  
                <div>
                  < FacebookShareButton url={shareUrl}> 
                    <FacebookIcon size={32} round />
                  </ FacebookShareButton>
                  < TwitterShareButton url={shareUrl}> 
                    <TwitterIcon size={32} round />
                  </ TwitterShareButton>
                  < WhatsappShareButton url={shareUrl}> 
                    <WhatsappIcon size={32} round />
                  </ WhatsappShareButton>
                  < EmailShareButton url={shareUrl}> 
                    <EmailIcon size={32} round />
                  </ EmailShareButton>
                </div>
              </div>

          </div>
      </div>
    </>
  )
}

export default OutroPage;
import React, { useState, useRef } from 'react';

//custom imports of components
import FeedbackForm from './FeedbackForm';
import FeedbackResults from './FeedbackResults';


function Home() {

    // state variables
    const [formFlag, setFormFlag] = useState(true);
    const [resultsFlag, setResultsFlag] = useState(false);

    //ref variables
    const form = useRef(null);
    const results = useRef(null);


    // function to open Formtab for feddback form 
    const openFormTab = () => {
        setResultsFlag(false);
        setFormFlag(true);
        form.current.classList.add("active");
        results.current.classList.remove("active");
    }

    // function to open resultsTab to see every feedback data submitted through form 
    const openResultsTab = () => {
        setFormFlag(false);
        setResultsFlag(true);
        results.current.classList.add("active");
        form.current.classList.remove("active");
    }


  // display on the screen 
  return (

    <section className='home'>
        
        <div className='title-bar'>

            <h2 className='form-title'>Aromatic Bar</h2>

            <div className='tabs'>
                <p ref={form} className="active" onClick={openFormTab}>Feedback Form</p>
                <p ref={results} onClick={openResultsTab}>Feedback Results</p>
            </div>

        </div>

        <div className='container'>
            { formFlag && <FeedbackForm/> }
            { resultsFlag && <FeedbackResults/> }
        </div>

    </section>

  )

}

export default Home;
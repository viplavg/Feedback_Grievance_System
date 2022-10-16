import React, { useRef, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

//custom component import
import Modal from './Modal';


function FeedbackForm() {

    // getting the data from localStorage to check if something already exist so that the additional can be appended to that same localStorage
    let data = [];
    if(localStorage.getItem("masterData") !== null){
        data = JSON.parse(localStorage.getItem("masterData"));
    } else {
        localStorage.setItem("masterData", JSON.stringify(data));
    }
    

    // state variables for showing some validation errors 
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [lenghtError, setLengthError] = useState(false);
    const [validEmailError, setValidEmailError] = useState(false);
    const [invalidPhoneError, setInvalidPhoneError] = useState(false);
    
    // states variables for radio buttons (i.e., choices) 
    const [quality, setQuality] = useState(null);
    const [beverage, setBeverage] = useState(null);
    const [clean, setClean] = useState(null);
    const [dining, setDining] = useState(null);

    // variables to keep track of every validation
    let validation = false;
    let markedChoices = false;

    //array of objects for choices data to reduce some redundancy
    const choices = [
        {
            title: "Please rate the quality of service you received from your host.",
            type: "quality", 
            option: "Excellent"
        },
        {
            title: "Please rate the quality of your beverage.",
            type: "beverage", 
            option: "Good"
        }, 
        {
            title: "Was our restaurant clean?.",
            type: "clean", 
            option: "Fair"
        }, 
        {
            title: "Please rate your overall dining experience.",
            type: "dining", 
            option: "Bad"
        }
    ];

    // state variables to manage input values data coming in an event object through onChange
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);

    // state variable to toggle modal 
    const [toggleModal, setToggleModal] = useState(false);

    //useRef variable to instantly reset form data after submitting
    const form = useRef();

    // function to validate customer name field 
    function checkName(){
        if(name == null){
            setNameError(true);
            validation = false;
        } else if(name.length < 3) {
            setNameError(false);
            setLengthError(true);
            validation = false;
        } else {
            setNameError(false);
            setLengthError(false);
            validation = true;
        }
    }

    // function to validate email field 
    function checkEmail(){
        let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(email == null){
            setEmailError(true);
            validation = false;
        } else {

            if(!regEx.test(email)){
                setEmailError(false);
                setValidEmailError(true);
                validation = false;
            } else {
                setValidEmailError(false);
                setEmailError(false);
                validation = true;
            }

        }
    }

    // function to validate phone number field
    function checkPhone(){
        let regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        
        if(phone == null){
            setPhoneError(true);
            validation = false;
        } else {
            
            if(!regex.test(phone)){
                setPhoneError(false);
                setInvalidPhoneError(true);
                validation = false;
            } else {
                setPhoneError(false);
                setInvalidPhoneError(false);
                validation = true;
            }

        }
    }

    // function to validate checkBox choices based on value
    function checkChoices(){
        if(quality == null || beverage == null || clean == null || dining == null){
            markedChoices = false;
        } else {
            markedChoices = true;
        }
    }

    // final function which is called onSubmit of Submit Review button and data gets submiited (actually stored in localStorage)
    function handleSubmit(e) {
        e.preventDefault();
        checkName();
        checkEmail();
        checkPhone();
        checkChoices();

        if(validation && markedChoices){
            let validatedData = {
                name: name,
                email: email,
                phone: phone,
                quality: quality,
                beverage: beverage,
                clean: clean,
                dining: dining,
            };

            data.push(validatedData);
            localStorage.setItem("masterData", JSON.stringify(data));
            setToggleModal(true);

            //after data gets submitted reset the form back to empty fields
            form.current.reset();
            setPhone("");
        }
    }
 
  // display on the screen 
  return (

    <>
        <div className='feedback-form'>
            
            <p className='form-desc'>
                We are committed to providing you with the best
                dining experience possible, so we welcome your comments. Please fill
                out this questionnaire. Thank you.
            </p>

            <form ref={form} className='form-control' onSubmit={(e)=>handleSubmit(e)}>

                <div className='form'>

                    <div className='inputs'>
                        <div>
                            <label>Customer Name<span>*</span></label>
                            <input type="text" placeholder='E.g. John Doe' onChange={(e)=>setName(e.target.value)}/>
                            {
                                nameError && <p className='invalid-box'><i className="fa-solid fa-circle-exclamation" /><span>Please enter the value for the above field</span></p>
                            }

                            {
                                lenghtError && <p className='invalid-box'><i className="fa-solid fa-circle-exclamation" /><span>Name can not be less than 3 characters</span></p>
                            }
                            
                        </div>

                        <div>
                            <label>Email<span>*</span></label>
                            <input type="text" placeholder='E.g. abc@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
                            {
                                emailError && <p className='invalid-box'><i className="fa-solid fa-circle-exclamation" /><span>Please enter the value for the above field</span></p>
                            }
                            {
                                validEmailError && <p className='invalid-box'><i className="fa-solid fa-circle-exclamation" /><span>Please enter the valid email address</span></p>
                            }                    
                            
                        </div>
                    </div>

                    <div className='contact-field'>
                        <p>Phone<span>*</span></p>
                        <PhoneInput
                            placeholder="Enter phone number"
                            defaultCountry="IN"
                            value={phone}
                            onChange={setPhone}
                        />
                        {
                            phoneError && <p className='invalid-box phone-error'><i className="fa-solid fa-circle-exclamation" /><span>Please enter the value for the above field</span></p>
                        }
                        {
                            invalidPhoneError && <p className='invalid-box phone-error'><i className="fa-solid fa-circle-exclamation" /><span>Please enter the valid phone number</span></p>
                        }
                    </div>

                    <div className='objectives'>

                        <div className='feedbacks'>
                            <p>{choices[0].title}<span>*</span></p>
                            <div className='ratings'>
                                {
                                    choices.map((ch,ind)=>{
                                        return (
                                            <div key={ind}>
                                                <input type="radio" name="quality" value={ch.option} onChange={(e)=>setQuality(e.target.value)} required/>
                                                <label>{ch.option}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='feedbacks'>
                            <p>{choices[1].title}<span>*</span></p>
                            <div className='ratings'>
                                {
                                    choices.map((ch,ind)=>{
                                        return (
                                            <div key={ind}>
                                                <input type="radio" name="beverage" value={ch.option} onChange={(e)=>setBeverage(e.target.value)} required/>
                                                <label>{ch.option}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='feedbacks'>
                            <p>{choices[2].title}<span>*</span></p>
                            <div className='ratings'>
                                {
                                    choices.map((ch,ind)=>{
                                        return (
                                            <div key={ind}>
                                                <input type="radio" name="clean" value={ch.option} onChange={(e)=>setClean(e.target.value)} required/>
                                                <label>{ch.option}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='feedbacks'>
                            <p>{choices[3].title}<span>*</span></p>
                            <div className='ratings'>
                                {
                                    choices.map((ch,ind)=>{
                                        return (
                                            <div key={ind}>
                                                <input type="radio" name="dining" value={ch.option} onChange={(e)=>setDining(e.target.value)} required/>
                                                <label>{ch.option}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                
                </div>


                <div className='submit-button'>
                    <button type="submit">Submit Review</button>
                </div>
                
            </form>
            
        </div>
        { toggleModal && <Modal open={toggleModal} onHide={()=>setToggleModal(false)}/> }
    </>

  )


}

export default FeedbackForm;
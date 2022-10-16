import React from 'react';
import Fade from 'react-reveal/Fade';


function Modal({open, onHide}) {

  return (

    <>
      {
        open && (
          <Fade>
            <section className='modal'>

              <div className='modal-container'>

                  
                  <div className='modal-content'>

                      <i class="fa-solid fa-circle-check"></i>

                      <div className='modal-desc'>
                          <p>Thank you for providing the feedback</p>
                          <span>We will work towards improving your experience</span>
                      </div>

                      <button onClick={onHide}>Close</button>

                  </div>

              </div>

            </section>
          </Fade>
        )
      }

    </>

  )

}

export default Modal;
import React, { useState } from "react";
import PropTypes from "prop-types";
import './form-styling.css';

const Form = (props) => {

  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    let value = e.target.value;
    let input_type = e.target.name;
    
    setInput( prev => ({ ...prev,  [input_type]: value }) );
    
  }
  
  
  const onSubmit = async e => {

    e.preventDefault();
    setLoading(true);

    try {
      await props.onSubmit(input);
    } finally {
      setLoading(false);
    }

  };


  return (
    <>
      <div className="container-form">
        <form onSubmit={onSubmit}>

          <fieldset disabled={loading} aria-busy={loading}>
            <legend>{'▶️ ' + props.title + ' ◀️'}</legend>

            <div className="container-email-input" >
              <label htmlFor="email">
                e-mail:
              </label>
              <input 
                placeholder="...e-mail here..."
                type="email" 
                id="input-for-email" 
                name="email" 
                onChange={handleInput}
              />
            </div>

            <div className="container-password-input" >
              <label htmlFor="password">
                password:
              </label>
              <input 
                placeholder="...password here..."
                type="password" 
                id="input-for-password" 
                name="password"           
                onChange={handleInput}
              />
            </div> 

            <div className="container-submit-button" >
              <input 
                id = "button-form"
                type="submit" 
                value={`Submit${loading ? "ting" : ""}`} 
              />

            </div> 

          </fieldset>
        </form>
      </div>
    </>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
        type: PropTypes.string
      }.isRequired
    )
  ),
  onSubmit: PropTypes.func.isRequired
};

export default Form;
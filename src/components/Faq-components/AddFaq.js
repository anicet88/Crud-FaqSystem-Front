import React, { useState } from "react";
import FaqService from "../../services/FaqService";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';




const colourOptions = [
  { value: 'le probleme est resolu', label: 'le probleme est resolu' },
  { value: 'utiliser le logiciel completement', label: 'utiliser le logiciel completement' },
  { value: 'comprendre le probleme depuis la base', label: 'comprendre le probleme depuis la base' }
];
const animatedComponents = makeAnimated();

const AddFaq = () => {
  const initialFaqState = {
    code: null,
    question: "",
    details: "",
    status: "",
    isValidated: false
  };
  const [faq, setCategorie] = useState(initialFaqState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCategorie({ ...faq, [name]: value });
  };

  const saveFaq = () => {
    var data = {
      question: faq.question,
      details: faq.details,
      status: faq.details
    };

    FaqService.create(data)
      .then(response => {
        setCategorie({
          code: response.data.code,
          question: response.data.question,
          details: response.data.details,
          status: response.data.status,
          isValidated: response.data.isValidated
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newFaq = () => {
    setCategorie(initialFaqState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFaq}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              className="form-control"
              code="question"
              required
              value={faq.question}
              onChange={handleInputChange}
              name="question"
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className="form-control"
              code="details"
              required
              value={faq.details}
              onChange={handleInputChange}
              name="details"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              code="status"
              required
              value={faq.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>
        <div className="form-group">
        <label htmlFor="reponse">Reponse</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[colourOptions[1], colourOptions[2]]}
          isMulti
          options={colourOptions}
          />
        </div>
          <button onClick={saveFaq} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFaq;

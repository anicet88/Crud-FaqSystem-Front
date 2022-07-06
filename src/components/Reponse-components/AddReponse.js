import React, { useState } from "react";
import ReponseService from "../../services/ReponseService";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const categorieOptions = [
  { value: 'Santé', label: '' },
  { value: 'Famille', label: 'Famille' },
  { value: 'Cinéma', label: 'Cinéma' },
  { value: 'Programmation', label: 'Programmation' },

];



const faqOptions = [
  { value: 'le probleme est-il resolu?', label: 'le probleme est resolu?' },
  { value: 'le logiciel est-il à jour?', label: 'le logiciel est-il à jour?' },
  { value: 'le problème est-il compris?', label: 'le problème est-il compris?' }
];
const animatedComponents = makeAnimated();

const AddReponse = () => {
  const initialReponseState = {
    code: null,
    reponse: "",
    status: "",
    isValidated: false
  };
  const [reponse, setReponse] = useState(initialReponseState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setReponse({ ...reponse, [name]: value });
  };

  const saveReponse = () => {
    var data = {
      reponse: reponse.reponse
    };

    ReponseService.create(data)
      .then(response => {
        setReponse({
          code: response.data.code,
          reponse: response.data.reponse,
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

  const newReponse = () => {
    setReponse(initialReponseState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newReponse}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="reponse">Reponse</label>
            <input
              type="text"
              className="form-control"
              code="reponse"
              required
              value={reponse.reponse}
              onChange={handleInputChange}
              name="reponse"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              code="status"
              required
              value={reponse.reponse}
              onChange={handleInputChange}
              name="status"
            />
          </div>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[faqOptions[1], faqOptions[2]]}
          isMulti
          options={faqOptions}
          />
          </div>
          <div className="form-group">
            <label htmlFor="question">Categorie</label>
            <Select
              closeMenuOnSelect={false}
             components={animatedComponents}
             defaultValue={[categorieOptions[1], categorieOptions[2]]}
          isMulti
          options={categorieOptions}
          />
          </div>
          <button onClick={saveReponse} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddReponse;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import FaqService from "../../services/FaqService";


const Faq = props => {
  const { code }= useParams();
  let navigate = useNavigate();

  const initialCategorieState = {
    code: null,
    question: "",
    description: "",
    status: "",
    isVisible: false,
    isValidated: false
  };
  const [currentFaq, setCurrentFaq] = useState(initialCategorieState);
  const [message, setMessage] = useState("");

  const getFaq = code => {
    FaqService.get(code)
      .then(response => {
        setCurrentFaq(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (code)
      getFaq(code);
  }, [code]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFaq({ ...currentFaq, [name]: value });
  };

  const updateValidate = valide => {
    var data = {
      code: currentFaq.code,
      question: currentFaq.question,
      details: currentFaq.details,
      isValidated: valide
    };

    FaqService.update(currentFaq.code, data)
      .then(response => {
        setCurrentFaq({ ...currentFaq, isValidated: valide });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateFaq = () => {
    FaqService.update(currentFaq.code, currentFaq)
      .then(response => {
        console.log(response.data);
        setMessage("The Faq was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteFaq = () => {
    FaqService.remove(currentFaq.code)
      .then(response => {
        console.log(response.data);
        navigate("/faqs");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentFaq ? (
        <div className="edit-form">
          <h4>FAQ</h4>
          <form>
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <input
                type="text"
                className="form-control"
                code="question"
                name="question"
                value={currentFaq.question}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <input
                type="text"
                className="form-control"
                code="details"
                name="details"
                value={currentFaq.details}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentFaq.isValidated ? "Validé" : "En attente"}
            </div>
          </form>

          {currentFaq.isValidated ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateValidate(false)}
            >
              Non Validé
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateValidate(true)}
            >
              Validé
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteFaq}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateFaq}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Cliquer sur une Faq...</p>
        </div>
      )}
    </div>
  );
};

export default Faq;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ReponseService from "../../services/ReponseService";

const Reponse = props => {
  const { code }= useParams();
  let navigate = useNavigate();

  const initialReponseState = {
    code: null,
    reponse: "",
    status: "",
    isVisible: false,
    isValidated: false
  };
  const [currentReponse, setCurrentReponse] = useState(initialReponseState);
  const [message, setMessage] = useState("");

  const getReponse = code => {
    ReponseService.get(code)
      .then(response => {
        setCurrentReponse(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (code)
      getReponse(code);
  }, [code]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentReponse({ ...currentReponse, [name]: value });
  };

  const updateValidate = valide => {
    var data = {
      code: currentReponse.code,
      reponse: currentReponse.reponse,
      details: currentReponse.details,
      isValidated: valide
    };

    ReponseService.update(currentReponse.code, data)
      .then(response => {
        setCurrentReponse({ ...currentReponse, isValidated: valide });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateReponse = () => {
    ReponseService.update(currentReponse.code, currentReponse)
      .then(response => {
        console.log(response.data);
        setMessage("The Reponse was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteReponse = () => {
    ReponseService.remove(currentReponse.code)
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
      {currentReponse ? (
        <div className="edit-form">
          <h4>Reponse </h4>
          <form>
            <div className="form-group">
              <label htmlFor="reponse">Reponse</label>
              <input
                type="text"
                className="form-control"
                code="reponse"
                name="reponse"
                value={currentReponse.reponse}
                onChange={handleInputChange}
              />
            </div>
          
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentReponse.isValidated ? "Ok" : "En attente"}
            </div>
          </form>

          {currentReponse.isValidated ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteReponse}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateReponse}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Cliquer sur une Reponse...</p>
        </div>
      )}
    </div>
  );
};

export default Reponse;

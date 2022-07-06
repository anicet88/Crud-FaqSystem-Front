import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CategorieService from "../../services/CategorieService";

const Categorie = props => {
  const { code }= useParams();
  let navigate = useNavigate();

  const initialCategorieState = {
    code: null,
    libelle: "",
    description: "",
    status: "",
    isVisible: false,
    isValidated: false
  };
  const [currentCategorie, setCurrentCategorie] = useState(initialCategorieState);
  const [message, setMessage] = useState("");

  const getCategorie = code => {
    CategorieService.get(code)
      .then(response => {
        setCurrentCategorie(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (code)
      getCategorie(code);
  }, [code]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCategorie({ ...currentCategorie, [name]: value });
  };

  const updateValidate = valide => {
    var data = {
      code: currentCategorie.code,
      libelle: currentCategorie.libelle,
      description: currentCategorie.description,
      isValidated: valide
    };

    CategorieService.update(currentCategorie.code, data)
      .then(response => {
        setCurrentCategorie({ ...currentCategorie, isValidated: valide });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCategorie = () => {
    CategorieService.update(currentCategorie.code, currentCategorie)
      .then(response => {
        console.log(response.data);
        setMessage("The category was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCategorie = () => {
    CategorieService.remove(currentCategorie.code)
      .then(response => {
        console.log(response.data);
        navigate("/categories");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCategorie ? (
        <div className="edit-form">
          <h4>Categorie</h4>
          <form>
            <div className="form-group">
              <label htmlFor="libelle">Title</label>
              <input
                type="text"
                className="form-control"
                code="libelle"
                name="libelle"
                value={currentCategorie.libelle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                code="description"
                name="description"
                value={currentCategorie.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCategorie.isValidated ? "Validé" : "En attente"}
            </div>
          </form>

          {currentCategorie.isValidated ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteCategorie}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCategorie}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Cliquer sur une Categorie...</p>
        </div>
      )}
    </div>
  );
};

export default Categorie;

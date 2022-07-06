import React, { useState } from "react";
import CategorieService from "../../services/CategorieService";

const AddCategorie = () => {
  const initialCategorieState = {
    code: null,
    libelle: "",
    description: "",
    status: "",
    isValidated: false
  };
  const [categorie, setCategorie] = useState(initialCategorieState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCategorie({ ...categorie, [name]: value });
  };

  const saveCategorie = () => {
    var data = {
      libelle: categorie.libelle,
      description: categorie.description,
      status: categorie.status

    };

    CategorieService.create(data)
      .then(response => {
        setCategorie({
          code: response.data.code,
          libelle: response.data.libelle,
          description: response.data.description,
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

  const newCategorie = () => {
    setCategorie(initialCategorieState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCategorie}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="libelle">Categorie</label>
            <input
              type="text"
              className="form-control"
              code="libelle"
              required
              value={categorie.libelle}
              onChange={handleInputChange}
              name="libelle"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              code="description"
              required
              value={categorie.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Status</label>
            <input
              type="text"
              className="form-control"
              code="status"
              required
              value={categorie.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>


          <button onClick={saveCategorie} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCategorie;

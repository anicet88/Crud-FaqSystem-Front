import React, { useState, useEffect } from "react";
import CategorieService from "../../services/CategorieService";
import { Link } from "react-router-dom";

const CategorieList = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategorie, setCurrentCategorie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchLibelle, setSearchCategorie] = useState("");

  useEffect(() => {
    retrieveCategories();
  }, []);

  const onChangeSearchlibelle = e => {
    const searchLibelle = e.target.value;
    setSearchCategorie(searchLibelle);
  };

  const retrieveCategories = () => {
    CategorieService.getAll()
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCategories();
    setCurrentCategorie(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (categorie, index) => {
    setCurrentCategorie(categorie);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    CategorieService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByLibelle = () => {
    CategorieService.findByLibelle(searchLibelle)
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by libelle"
            value={searchLibelle}
            onChange={onChangeSearchlibelle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByLibelle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Liste des categories</h4>

        <ul className="list-group">
          {categories &&
            categories.map((categorie, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(categorie, index)}
                key={index}
              >
                {categorie.libelle}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCategorie ? (
          <div>
            <h4>Categorie</h4>
            <div>
              <label>
                <strong>Libelle:</strong>
              </label>{" "}
              {currentCategorie.libelle}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCategorie.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCategorie.status}
            </div>
            
            <div>
              <label>
                <strong>Validation:</strong>
              </label>{" "}
              {currentCategorie.status ? "Validé " : "En attente "}
            </div>

            <Link
              to={"/categories/" + currentCategorie.code}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Cliquer sur une Categorie...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorieList;

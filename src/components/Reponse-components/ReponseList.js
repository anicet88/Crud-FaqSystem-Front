import React, { useState, useEffect } from "react";
import ReponseService from "../../services/ReponseService";
import { Link } from "react-router-dom";


const ReponseList = () => {
  const [reponses, setReponses] = useState([]);
  const [currentReponse, setCurrentReponse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchReponse, setSearchReponse] = useState("");

  useEffect(() => {
    retrieveReponse();
  }, []);

  const onChangeSearchTitle = e => {
    const searchReponse = e.target.value;
    setSearchReponse(searchReponse);
  };

  const retrieveReponse = () => {
    ReponseService.getAll()
      .then(response => {
        setReponses(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveReponse();
    setCurrentReponse(null);
    setCurrentIndex(-1);
  };

  const setActiveReponse = (reponse, index) => {
    setCurrentReponse(reponse);
    setCurrentIndex(index);
  };

  const removeAllReponse = () => {
    ReponseService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByReponse = () => {
    ReponseService.findByReponse(searchReponse)
      .then(response => {
        setReponses(response.data);
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
            placeholder="Search by reponse"
            value={searchReponse}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByReponse}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Liste des Reponses</h4>

        <ul className="list-group">
          {reponses &&
            reponses.map((reponse, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveReponse(reponse, index)}
                key={index}
              >
                {reponse.reponse}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllReponse}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentReponse ? (
          <div>
            <h4>Reponse</h4>
            <div>
              <label>
                <strong>Reponse:</strong>
              </label>{" "}
              {currentReponse.reponse}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentReponse.status}
            </div>
            <div>
              <label>
                <strong>Validation:</strong>
              </label>{" "}
              {currentReponse.isValidated ? "Validé" : "En attente"}
            </div>

            <Link
              to={"/reponses/" + currentReponse.code}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Cliquer sur une Reponse...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReponseList;

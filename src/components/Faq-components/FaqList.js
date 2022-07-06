import React, { useState, useEffect } from "react";
import FaqService from "../../services/FaqService";
import { Link } from "react-router-dom";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchFaq, setSearchFaq] = useState("");

  useEffect(() => {
    retrieveFaq();
  }, []);

  const onChangeSearchFaq = e => {
    const searchFaq = e.target.value;
    setSearchFaq(searchFaq);
  };

  const retrieveFaq = () => {
    FaqService.getAll()
      .then(faq => {
        setFaqs(faq.data);
        console.log(faq.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFaq();
    setCurrentFaq(null);
    setCurrentIndex(-1);
  };

  const setActiveFaq = (faq, index) => {
    setCurrentFaq(faq);
    setCurrentIndex(index);
  };

  const removeAllFaq = () => {
    FaqService.removeAll()
      .then(faq => {
        console.log(faq.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByFaq = () => {
    FaqService.findByFaq(searchFaq)
      .then(faq => {
        setFaqs(faq.data);
        console.log(faq.data);
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
            placeholder="Search by faq"
            value={searchFaq}
            onChange={onChangeSearchFaq}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByFaq}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Liste des Faqs</h4>

        <ul className="list-group">
          {faqs &&
            faqs.map((faq, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFaq(faq, index)}
                key={index}
              >
                {faq.question}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllFaq}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentFaq ? (
          <div>
            <h4>Faq</h4>
            <div>
              <label>
                <strong>Question:</strong>
              </label>{" "}
              {currentFaq.question}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentFaq.status}
            </div>
            <div>
              <label>
                <strong>Details:</strong>
              </label>{" "}
              {currentFaq.details}
            </div>
            <div>
              <label>
                <strong>Validation:</strong>
              </label>{" "}
              {currentFaq.isValidated ? "Validé" : "En attente"}
            </div>

            <Link
              to={"/faqs/" + currentFaq.code}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Cliquer sur une Question...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqList;

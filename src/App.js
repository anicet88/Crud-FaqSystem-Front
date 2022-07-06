import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFaq from "./components/Faq-components/AddFaq";
import Faq from "./components/Faq-components/Faq";
import FaqList from "./components/Faq-components/FaqList"
import ReponseList from "./components/Reponse-components/ReponseList";
import AddReponse from "./components/Reponse-components/AddReponse";
import Reponse from "./components/Reponse-components/Reponse";
import CategorieList from "./components/Categories-components/CategorieList";
import AddCategorie from "./components/Categories-components/AddCategorie";
import Categorie from "./components/Categories-components/Categorie";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/faqs" className="navbar-brand">
          Faq System
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/faqs"} className="nav-link">
              Faqs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/reponses"} className="nav-link">
              Reponses
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/categories"} className="nav-link">
              Categories
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* les routes pour les pages liées aux faqs */}
          <Route path="/" element={<FaqList/>} />
          <Route path="/faqs" element={<FaqList/>} />
          <Route path="/addfaq" element={<AddFaq/>} />
          <Route path="/faqs/:code" element={<Faq/>} />
          {/* les routes pour les pages liées aux reponses */}
          <Route path="/reponses" element={<ReponseList/>} />
          <Route path="/addrep" element={<AddReponse/>} />
          <Route path="/reponses/:code" element={<Reponse/>} />
          {/* les routes pour les pages liées aux categories */}
          <Route path="/categories" element={<CategorieList/>} />
          <Route path="/addcateg" element={<AddCategorie/>} />
          <Route path="/categories/:code" element={<Categorie/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

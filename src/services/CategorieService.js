import http from "../http-common";

const getAll = () => {
  return http.get("/categories");
};

const get = code => {
  return http.get(`/categories/${code}`);
};

const create = data => {
  return http.post("/categories", data);
};

const update = (code, data) => {
  return http.put(`/categories/${code}`, data);
};

const remove = code => {
  return http.delete(`/categories/${code}`);
};

const removeAll = () => {
  return http.delete(`/categories`);
};

const findByCategorie = categories => {
  return http.get(`/categories?categories=${categories}`);
};

const CategorieService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByCategorie
};

export default CategorieService;

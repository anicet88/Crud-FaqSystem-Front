import http from "../http-common";

const getAll = () => {
  return http.get("/reponses");
};

const get = code => {
  return http.get(`/reponses/${code}`);
};

const create = data => {
  return http.post("/reponses", data);
};

const update = (code, data) => {
  return http.put(`/reponses/${code}`, data);
};

const remove = code => {
  return http.delete(`/reponses/${code}`);
};

const removeAll = () => {
  return http.delete(`/reponses`);
};

const findByReponse = reponses => {
  return http.get(`/reponses?reponses=${reponses}`);
};

const ReponseService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByReponse
};

export default ReponseService;

import http from "../http-common";

const getAll = () => {
  return http.get("/faqs");
};

const get = code => {
  return http.get(`/faqs/${code}`);
};

const create = data => {
  return http.post("/faqs", data);
};

const update = (code, data) => {
  return http.put(`/faqs/${code}`, data);
};

const remove = code => {
  return http.delete(`/faqs/${code}`);
};

const removeAll = () => {
  return http.delete(`/faqs`);
};

const findByFaq = faqs => {
  return http.get(`/faqs?faqs=${faqs}`);
};

const FaqService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByFaq
};

export default FaqService;

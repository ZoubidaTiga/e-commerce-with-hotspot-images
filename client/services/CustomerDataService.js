import http from "../http-common";
class CustomerDataService {
  getAll() {
    return http.get("/customers",{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }
  get(id) {
    return http.get(`/customers/${id}`);
  }
  create(data) {
    return http.post("/customers/register", data);
  }
  login(data) {
    return http.post("/customers/login", data);
  }
  update(id, data) {
    return http.put(`/customers/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/customers/delete/${id}`);
  }
 
}
export default new CustomerDataService();
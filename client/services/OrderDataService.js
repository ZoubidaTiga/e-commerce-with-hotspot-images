import http from "../http-common";
class OrderDataService {
  getAll() {
    return http.get("/orders",{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }
  get(id) {
    return http.get(`/orders/${id}`);
  }
  incomes(){
    return http.get(`/orders/${id}`);
  }
  create(data) {
    return http.post(`/Orders/crea/`, data);
  }
  incomes(){
    return http.get("orders/income",{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}});
  }
  update(id, data) {
    return http.put(`/orders/update/${id}`,data,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}});
  }
  delete(id) {
    return http.delete(`/orders/delete/${id}`,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }
  find(id) {
    return http.get(`/orders/findById/${id}`,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }
 
}
export default new OrderDataService();
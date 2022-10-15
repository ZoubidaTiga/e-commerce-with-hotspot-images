

import http from "../http-common";
class MediaDataService {

  getAllCol() {
    return http.get("/collection");
  }
  
  get(id) {
    return http.get(`/collection/${id}`);
  }
  create(data) {
    return http.post("/media/add", data);
  }
 
  /* update(id, data) {
    return http.put(`/orders/update/${id}`,data,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}});
  }
  delete(id) {
    return http.delete(`/orders/delete/${id}`,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }
  find(id) {
    return http.get(`/orders/findById/${id}`,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  } */
 
}
export default new MediaDataService();
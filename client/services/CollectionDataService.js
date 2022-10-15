import http from "../http-common";
class CollectionDataService {

  getAllCol() {
    return http.get("/collection");
  }
  
  get(id) {
    return http.get(`/collection/${id}`);
  }
  create(data) {
    return http.post("/collection/", data);
  }
 
  update(id,data) {

    return http.patch(`/collection/update/${id}`,data);
  }
  
  delete(id) {
    return http.delete(`/collection/delete/${id}`);
  }
  /*
  find(id) {
    return http.get(`/orders/findById/${id}`,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  } */
 findColByProd(productId) {
    return http.get(`/collection/product/${productId}`);
  } 
}
export default new CollectionDataService();


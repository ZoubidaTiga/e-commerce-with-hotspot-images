import http from "../http-common";
class UserDataService {

  loginUser(data) {
      
    return http.post("/users/login", data);
    }

  
  getAll() {
    
    return http.get("/users",{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }  
  get(id) {
    return http.get(`/users/find/${id}`);
  }
  create(data) {
    return http.post("/users/register", data);
  }
  update(id, data) {
    return http.put(`/users/update/${id}`, data,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
  });
  }
  me() {
    return http.get(`/users/me`,
      { headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}
    });
  }
  delete(id) {
    return http.delete(`/users/delete/${id}`);
  }
  updateByAdmin(id,data) {
    return http.put(`/users/updateByAdmin/${id}`,data,{ headers: {"token" : `Bearer ${localStorage.getItem("jwt")}`}});
  }
 
}
export default new UserDataService();
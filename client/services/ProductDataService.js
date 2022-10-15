import axios from 'axios';
const url = '/api/product';

export default class ProductDataService {
    // get all the products 

    static async getAllProduct(){

        const res = await axios.get(url);

        return res.data;

    }


    static async getProductById(id){

        const res = await axios.get(`${url}/${id}`);

        return res.data;
        
    }

    //to insert product into DataBase
    static async addProduct(product){
        console.log(product)
        const res = await axios.post(url,product);
        return res.data;
    }

      //to update product into DataBase
      static async updateProduct(id,product){
        const res = await axios.patch(`${url}/${id}`,product);  
                console.log("dkhlt l edit ")

        return res.data;
    }

     // to delete single product by id

     static async deleteProductById(id){

        const res = await axios.delete(`${url}/${id}`);

        return res.data;
        
    }


}
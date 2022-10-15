import Vuex from 'vuex'
import Vue  from 'vue'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        cartItemCount :0||JSON.parse(JSON.stringify(localStorage.getItem('count'))),
        cartItems :JSON.parse(localStorage.getItem('cart')) || [],
    },
    mutations:{
        addToCart(state, payload){
           
            let item = {...payload,qty :1}
            item = {...item,qty :1}
            item = { ...item, subTotal: item.Price }
            
            if(this.state.cartItemCount >0){
                let bool = state.cartItems.some(i =>i._id == item._id)
                if (bool){
                    let itemIndex = state.cartItems.findIndex(el => el._id == item._id)
                    state.cartItems[itemIndex]["qty"] +=1;
                }
                else{
                    this.state.cartItems.push(item);
                }}else{
                    this.state.cartItems.push(item);}
         this.state.cartItemCount++
         localStorage.setItem('cart', JSON.stringify(this.state.cartItems));
         localStorage.setItem('count', JSON.stringify(this.state.cartItemCount));


        },


         
      remove(state,payload){
           if(this.state.cartItemCount >0){
          let bool = state.cartItems.some(i =>i._id === payload._id)
      

            if( bool){
                let itemIndex = state.cartItems.findIndex(el => el._id === payload._id)
                if ( state.cartItems[itemIndex]["qty"] !==0){
                    state.cartItems[itemIndex]["qty"] -=1;
                    this.state.cartItemCount--
                    localStorage.setItem('count', JSON.stringify(this.state.cartItemCount));

                }
                 if( state.cartItems[itemIndex]["qty"] ===0){
                   this.state.cartItems.splice(itemIndex,1)
                }
                state.cartItems[itemIndex]["subTotal"]=state.cartItems[itemIndex]["Price"]*state.cartItems[itemIndex]["qty"]

                localStorage.setItem('cart', JSON.stringify(this.state.cartItems));

            } 
                
            }

                localStorage.setItem('products', JSON.stringify(this.state.cartItems));

            },
            addQty(state,payload){

                let itemIndex = state.cartItems.findIndex(el => el._id === payload._id)
                state.cartItems[itemIndex]["qty"] +=1;
                this.state.cartItemCount++
                localStorage.setItem('count', JSON.stringify(this.state.cartItemCount));

                state.cartItems[itemIndex]["subTotal"]=state.cartItems[itemIndex]["Price"]*state.cartItems[itemIndex]["qty"]

                localStorage.setItem('cart', JSON.stringify(this.state.cartItems));




            },
            setPrice(state,payload){
                console.log("priceChanged",payload)
                let itemIndex = state.cartItems.findIndex(el => el._id === payload._id)
                state.cartItems[itemIndex]["subTotal"]=state.cartItems[itemIndex]["Price"]*state.cartItems[itemIndex]["qty"]
               },
            minQty(state,payload){
                let itemIndex = state.cartItems.findIndex(el => el._id === payload._id)
                if(state.cartItems[itemIndex]["qty"] >1)
                { state.cartItems[itemIndex]["qty"] -=1
                this.state.cartItemCount--
                localStorage.setItem('count', JSON.stringify(this.state.cartItemCount));


                state.cartItems[itemIndex]["subTotal"]=state.cartItems[itemIndex]["Price"]*state.cartItems[itemIndex]["qty"]

                localStorage.setItem('cart', JSON.stringify(this.state.cartItems));

                }
           }
          
        },
        actions :{
        addToCart:(context,payload)=>{
            context.commit("addToCart",payload)
            context.commit("setPrice",payload)
        },
        remove:(context,payload)=>{
            context.commit("remove",payload)
            context.commit("setPrice",payload)

        },
        addQty:(context,payload)=>{ 
            context.commit("setPrice",payload)
            context.commit("addQty",payload)
        },
        minQty:(context,payload)=>{
            context.commit("minQty",payload)
            context.commit("setPrice",payload)
        },
        setPrice:(context,payload)=>{ 
            context.commit("setPrice",payload)
        }
        

    },
   
    getters:{
        cartItems: state=>{
            return state.cartItems

        },
        cartItemsCount:state=>{
            return state.cartItemCount
        },
        
        }
    })
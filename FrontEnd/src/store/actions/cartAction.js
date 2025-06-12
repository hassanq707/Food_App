import axios from "axios"
import {toast} from 'react-toastify'
import {incrementItem , decrementItem} from '../slices/CartSlice'

const updateCart = (itemId,action,token,url) => async(dispatch) =>{
   try{
    const response = await axios.post(`${url}/api/cart/addRemove`, {itemId,action},{
        headers : { token }
    })
    const {success,message} = response.data;
    if(!success){
      return toast.error(message);
    }

    if(action == "add") dispatch(incrementItem(itemId))

    if(action == "remove") dispatch(decrementItem(itemId))

   }catch(err){
    console.error("Cart Api Error", err);
   }
} 

export {
    updateCart
}
import { useParams } from "react-router-dom";
import api from "./axios";

export async function loginUser(email ,password){
   const formData = new URLSearchParams();
   formData.append("username" , email);
   formData.append("password" , password);

   const res = await api.post("/auth/login" , formData);
   return res.data;
}

export async function registerUser(name  ,email , password ){
    const res =  await api.post("/auth/register" ,{
      name ,
      email,
      password,
    });

    return res.data ;
}
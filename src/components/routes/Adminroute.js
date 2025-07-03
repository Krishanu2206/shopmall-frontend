import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import {Outlet} from 'react-router-dom'
import Spinner from '../Spinner';

export default function Adminroute(){
    const [ok, setok] = useState(false);
    const [auth, setauth] = useAuth();

    useEffect(()=>{
        const authcheck = async()=>{
            const response = await fetch(`/api/v1/auth/admin-auth`, {
                method:'GET',
                headers:{
                'Content-Type' : 'application/json',
                'Authorization' : auth?.token
            }
        });
        const result = await response.json();
        if(result.ok){
            setok(true)
        }else{
            setok(false)
        }
        }

        if(auth?.token) authcheck();
    }, [auth?.token])

    return ok? <Outlet/> : <Spinner path=""/>
}
import { useState, useContext, useEffect, createContext } from "react";

const Authcontext=createContext();

const Authprovider = ({children})=>{
    const [auth, setauth]=useState({
        user:null,
        token:""
    });

    useEffect(()=>{
        const data=localStorage.getItem('auth');
        if(data){
            const parsedata=JSON.parse(data);
            setauth({...auth, user:parsedata.user, token:parsedata.token});
        }
        //eslint-disable-next-line
    }, [])

    return(
        <Authcontext.Provider value={[auth, setauth]}>
            {children}
        </Authcontext.Provider>
    )
};

const useAuth = ()=> useContext(Authcontext);

export {useAuth, Authprovider};
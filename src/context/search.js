import { useState, useContext, createContext } from "react";

const Searchcontext=createContext();

const Searchprovider = ({children})=>{
const [search, setsearch]=useState({
    keyword : "",
    results : [],
});

return(
    <Searchcontext.Provider value={[search, setsearch]}>
        {children}
    </Searchcontext.Provider>
)
};

const useSearch = ()=> useContext(Searchcontext);

export {useSearch, Searchprovider};
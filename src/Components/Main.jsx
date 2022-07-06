import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

import './style.css'
import logo from '../pokeapi.png';

const Main = () => {
    const [pokeData , setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    //const [url, setUrl] = useState("https://localhost:5001/Pokemon");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [prevDisable, setPrevDisable] = useState(true);
    const [nextDisable, setNextDisable] = useState(true);

    const loadPokemon = async() => {
        const ret = await axios.get(url);

        setNextUrl(ret.data.next);
        setPrevUrl(ret.data.previous);
        getPokemonData(ret.data.results);
        setLoading(false)

        if (ret.data.previous != null) {
            setPrevDisable(false);
        } else {
            setPrevDisable(true);
        }

        if (ret.data.next != null) {
            setNextDisable(false);
        } else {
            setNextDisable(true);
        }
    }

    const getPokemonData = async(ret) => {
        ret.map(async(item)=>{            
            const result =  await axios.get(item.url);
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a,b) => a.id>b.id?1:-1)
                return state;
            })
        })
    }

    const handleDelete = (id) => {
        setPokeData(pokeData.filter(x => x.id !== id));
    }
    
    useEffect(() => {
        loadPokemon()
    }, [url])

    return(
        <>
            <nav className="navbar" >
                <a className="navbar-brand" href="#">
                    <img src={logo} alt=""/>&nbsp;                    
                </a>
            </nav>
            <div className="container">
                <Card pokemon={pokeData} loading={loading} handleDelete={(e) => handleDelete(e)}></Card>
                <div className="btn-div">
                    <button type="button" disabled={prevDisable} className="btn btn-nav" onClick={()=> {
                        setPokeData([])
                        setUrl(prevUrl)
                    }}>Anterior</button>&nbsp;&nbsp;
                    <button type="button" disabled={nextDisable} className="btn btn-nav" onClick={()=>{
                        setPokeData([])
                        setUrl(nextUrl)
                    }}>Próximo</button>
                </div>
                
            </div>
        </>
    )
};

export default Main;
import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import './style.css';

const Card = ({pokemon, loading, handleDelete}) => {
    const [pokeAbility, setPokeAblity] = useState([]);
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();    
    const [searchInput, setSearchInput] = useState('');

    function convertPokemonNameToUpperCase(args)
    {
        const pokeNameFirstLetter = args.split('')[0];
        const pokeNameOtherLetters = args.slice(1);
        const pokeNameUpperLetter = (pokeNameFirstLetter.toUpperCase() + pokeNameOtherLetters);

        return pokeNameUpperLetter;
    }

    function getPokemonImage(args)
    {        
        return args.sprites.other.dream_world.front_default ?? args.sprites.other.home.front_default;
    }
    
    const openPokeInfo = async(res) => {        
        const pokeNameUpperLetter = convertPokemonNameToUpperCase(res.name);
        const pokemonImage = getPokemonImage(res);

        setPokeName(pokeNameUpperLetter);
        setPokeHeight(res.height / 10);
        setPokeWeight(res.weight / 10); 
        setPokeImg(pokemonImage);
        handleShow();
        getPokemonAbilities(res.abilities);
    }

    function getPokemonAbilities(args)
    {
        setPokeAblity([]);
        args.map((a) => {
            setPokeAblity(state => {
                state = [...state, a.ability.name]
                return state;
            })
        })
    }


    return(
        <>
            <Modal show={showModal} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{pokeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="poke-content">
                    <img src={pokeImg} className="img-fluid img-height"></img>
                    <p>
                        Altura : {pokeHeight} metros | Peso : {pokeWeight} kg
                    </p>
                    <p>
                        Habilidades: {pokeAbility.map((pa)=> `${pa} | `)}
                    </p>
                </Modal.Body>
            </Modal>

            <div className="form-group poke-search">
                <span className="fa fa-search form-control-return">
                    <RiSearch2Line className="search-icon" />
                </span>
                <input type="text" className="form-control"
                onChange={event => {setSearchInput(event.target.value)}}
                placeholder="Search" />
            </div>

            <div className="row card-row">                
                {
                    loading ? <h1>Loading...</h1> :
                    pokemon.filter((item) => {
                        if (searchInput == "") {
                            return item
                        } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return item
                        }
                    }).map((item) => {
                        return (
                                <div className="col-md-3" key={item.id}>
                                    <div className="card poke-card" onClick={()=> openPokeInfo(item)}>
                                        <img className="card-img-top card-img" src={getPokemonImage(item)} alt="Card image cap"></img>
                                        <div className="card-body">
                                            <h5 className="card-title poke-name">{convertPokemonNameToUpperCase(item.name)}</h5>                                            
                                        </div>                                        
                                    </div>    
                                    <div className="card poke-card"><button onClick={() => handleDelete(item.id)}>Remover</button></div>                                
                                    <br />                                    
                                </div>
                        )
                    })
                }
            </div>
        </>
        
    )
}

export default Card;
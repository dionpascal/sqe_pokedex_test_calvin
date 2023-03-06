import React, {useEffect, useState} from "react";

import myData from './ListPokemon.json';

import "./index.css";
import PokemonItem from "./Component/PokemonItem";
import Pagination from "./Component/Pagination";
import DetailModal from "./Component/Modal.component";
import Search from "./Component/Search.component";

export default function App() {
    const [openModal, setOpenModal] = useState(false);
    const [listPokemon, setListPokemon] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState();
    const [itemOffset, setItemOffset] = useState(0);
    const jsonPokemon = JSON.parse(JSON.stringify(myData));

    const maxItemPerPage = 40
    const endOffset = itemOffset + maxItemPerPage;
    const currentItems = listPokemon.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listPokemon.length / maxItemPerPage);

    const _renderPokeList = (listPokemon) => {
        const onOpenModal = (item) => {
            setOpenModal(true);
            setCurrentPokemon(item)
        }

        return <div class='grid grid-cols-10'>
            {listPokemon.map((item, index) => <PokemonItem key={item}
                                                           number={itemOffset + index + 1}
                                                           onOpenModal={onOpenModal} {...item}/>)}
        </div>
    }

    const onChangePagination = (event, number) => {
        const newOffset = (( number - 1) * maxItemPerPage) % listPokemon.length;
        setItemOffset(newOffset);
    }

    const _renderPagination = () => {
        return <Pagination pageCount={pageCount} onChange={onChangePagination}/>
    }

    const onSearch = (value) => {
        if(value === ''){
            const jsonPokemon = JSON.parse(JSON.stringify(myData));
            setListPokemon(jsonPokemon.results)
        }else{
            const newArray = jsonPokemon.results.filter(function (el) {
                return el.name.includes(value)
            });
            setListPokemon(newArray)
        }
    }

    useEffect(() => {
        setListPokemon(jsonPokemon.results)
    }, [])

    return (
        <div className="App px-12 py-12">
            <div class='flex pb-20'>
                <div class='flex-1 text-left'>
                    <h1 class='text-6xl'>Pokedex</h1>
                    <h2 class='text-xl'>Search for Pokémon by using the name or their National Pokédex number</h2>
                </div>
                <Search onSearch={onSearch}/>
            </div>
            {listPokemon.length > 0 && _renderPokeList(currentItems)}
            {_renderPagination()}
            <DetailModal openModal={openModal} setOpenModal={setOpenModal} currentPokemon={currentPokemon}/>
        </div>
    );
}

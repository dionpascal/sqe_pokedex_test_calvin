import React from "react";

const PokemonItem = (props) => {
    return <div class="w-40 h-40 rounded overflow-hidden shadow-lg "
        onClick={() => props.onOpenModal({...props})}>
        <h2>{props.number}</h2>
        <h2>{props.name}</h2>
    </div>
}

export default PokemonItem

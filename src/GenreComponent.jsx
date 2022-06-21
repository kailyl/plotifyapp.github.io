import React, {useState, useEffect} from "react";
import "./genreComponent.css"

export function GenreComponent({genres}) {

    return (
        <div className="parent"> 
            {genres.map(genre => <p key={genre} className="genreComponent"> {genre} </p>)}
        </div>
    )
}
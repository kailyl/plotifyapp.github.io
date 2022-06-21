import React, {useState, useEffect} from "react";
import { findBounds, transformCoordinates } from "./helper";
import "./hoverComponent.css"
import { GenreComponent } from "./GenreComponent";

export function HoverComponent({x, y, imageSize, axisLength, popularity, danceability, songInfo, smallFormat}) {

    // set bounds for the coordinates
    const bounds = findBounds(popularity, danceability, axisLength, imageSize);

    // return correct component if in bounds 
    var currElem = null; 
    for (var key in bounds) {
        const lowX = bounds[key][0]
        const highX = bounds[key][1]
        const lowY = bounds[key][2]
        const highY = bounds[key][3]
        if (x >= lowX && x <= highX && y >= lowY && y <= highY) {
            currElem = key
        } 
    }
    if (currElem != null && currElem in songInfo) {
        const name = songInfo[currElem].track 
        const artists = songInfo[currElem].artists
        let artistString = "" 
        for (var i = 0; i < artists.length; i++) {
            if (i === 0) {
                artistString = artistString + artists[i].name
            } else {
                artistString = artistString + ", " + artists[i].name
            }
        }
        const genres = songInfo[currElem].genres
        let className = "songInfo"
        if (smallFormat) {
            className = "smallSongInfo"
        }
        return (
            <div className={className}>
                <p className="name"> 
                    <strong> {name} </strong>
                </p>
                <p className="artist"> 
                    {artistString}
                </p>
                <GenreComponent genres={genres}/>
            </div>
        )
        
    } else {
        return null
    }
}
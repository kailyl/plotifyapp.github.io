import React from "react";
import { findBounds } from "./helper";
import "./hoverComponent.css"
import { GenreComponent } from "./GenreComponent";

export function HoverComponent({x, y, imageSize, axisLength, popularity, valence, songInfo, smallFormat, isMobile, setHovered}) {
    // set bounds for the coordinates
    const bounds = findBounds(popularity, valence, axisLength, imageSize);

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
        if (!isMobile) {
            setHovered(name)
        }
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
        if (isMobile) {
            className = "mobile"
        }
        return (
            <div className="container"> 
                <div className={className}>
                    <div style={{display: "flex"}}> 
                        {isMobile ? <img src={songInfo[currElem].src} alt="image of album cover" className="songCover"/> : null}
                        <div> 
                            <p className="name"> 
                                <strong> {name} </strong>
                            </p>
                            <p className="artist"> 
                                {artistString}
                            </p>
                            <GenreComponent genres={genres}/>
                        </div>
                    </div> 
                </div>
            </div> 
        )
    } else {
        if (isMobile) {
            let songsFirstHalf = []; 
            let songsSecondHalf = []; 
            var count = 1; 
            for (var song in songInfo) {
                if (count < 6) {
                    songsFirstHalf.push(songInfo[song].track)
                } else {
                    songsSecondHalf.push(songInfo[song].track)
                }
                count++;
            }

            if (songsFirstHalf.length <= 0 || songsSecondHalf.length <= 0) {
                return (
                    <div> 
                        <h2 className="top10"> Loading Your Songs... </h2>
                    </div>
                )
            }
            return (
                <div className="topzz"> 
                    <div className="listOfSongs">
                        <h2 className="top10"> Your Top 10 </h2>
                        <div className="list"> 
                            <div className="left" > 
                                {songsFirstHalf.map(song => 
                                    <p key={song} style={{width: "100%"}}> {song} </p>
                                )}
                            </div> 
                            <div className="right"> 
                                {songsSecondHalf.map(song => 
                                    <p key={song} style={{width: "100%"}}> {song} </p>
                                )}
                            </div> 
                        </div>
                    </div>           
                </div>
                      
            )
        } else {
            return null;
        }
    }
}
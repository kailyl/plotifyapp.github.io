import React, {useState, useEffect} from "react";
import "./computerTop.css"

export function ComputerTop({songInfo, hoveredSong}) {
    const songs = []; 
    for (var song in songInfo) {
        if (hoveredSong === songInfo[song].track) {
            songs.push(<p key={song} style={{color: "#1DB954"}}> {songInfo[song].track} </p>)
        } else {
            songs.push(<p key={song} style={{color: "white"}}> {songInfo[song].track} </p>)
        }
    }

    return (
        <div className="margins"> 
            <div className="top"> 
                <h2 className="header"> Your Top 10</h2>
                <div className="songs"> 
                    {songs.map(song => <div> {song} </div>)}
                </div> 
            </div> 
        </div> 
    )
}
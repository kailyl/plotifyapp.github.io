import React from "react";
import "./Canvas.css"
import { getScreenSize } from "./getScreenSize";
import { MemorizedCanvas } from "./Canvas";
import { transformCoordinates } from "./helper";
import { KeyCanvas } from "./KeyCanvas";
import info from "./info-2-64.png";

export function DisplayGraph(props) {
    const songData = props.items;
    const popularityX = props.popularity;
    const valenceY = props.valence;
    const songDictionary = props.songDictionary;
    // keys are song ids, values are src links
    const albumSrcDictionary = {};

    // determine dimensions 
    const width = getScreenSize();
    let imgSize; 
    let axisLength; 
    let smallFormat = false; 
    let superSmallFormat = false; 
    if (width > 900) {
      imgSize = 0.038 * width; 
      axisLength = 0.4 * width;
    } else if (width > 600) {
      imgSize = 0.05 * width; 
      axisLength = 0.4 * width;
    }
      else {
      imgSize = 0.1 * width; 
      axisLength = 0.85 * width;
      smallFormat = true;
    }

    if (width < 400) {
      superSmallFormat = true;
    }

    // get tracks + album covers 
    if (songData !== null) {
      for (var i = 0; i < songData.length; i++) {
        albumSrcDictionary[songData[i].id] = songData[i].album.images[0].url;
      }  
    } 

    const loadedImages = {}
    // load images on graph w/o glitching (hopefully)
    function draw (context){
      if (Object.keys(loadedImages).length <= 0) {
        for (var key in albumSrcDictionary) {
          const image = new Image();
          image.src = albumSrcDictionary[key];
          const pt = transformCoordinates(popularityX[key], valenceY[key], axisLength, imgSize)
          image.onload = () => {
            context.drawImage(image, pt[0], pt[1], imgSize, imgSize);
          };
          loadedImages[key]= image
        }
      } else {
        for (var key2 in loadedImages) {
          const pt = transformCoordinates(popularityX[key2], valenceY[key2], axisLength, imgSize)
          context.drawImage(loadedImages[key2], pt[0], pt[1], imgSize, imgSize);
        }
      }   
    };

    // display stuff
    if (albumSrcDictionary.length < 10) {
        return (
            <p className="sorry"> Loading...</p>
        )
    } else if (width <300) {
      return (
        <p className="sorry"> 
          We're sorry, your display is too small to properly view the data. Please switch to a device with a larger screen size.
        </p>
      )
    } else {
      return (
        <div>
          <div className="heading">
            {smallFormat ? <h2 className="header" style={{fontSize: 20, marginBottom: 0}}> Where Your Taste Falls </h2> : 
                        <h2 className="header" style={{fontSize: 40, marginBottom: 0}}> Where Your Taste Falls </h2> 
            }
            <div className="infoDiv"> 
              <img className="info" src={info} alt="info page"/> 
              <div className="hiddenInfo"> 
                <h3 className="infoHeading"> Info </h3>
                <p> We use the Spotify API to determine the "popularity" and "valence" of your top 10 songs. This data is used 
                to calculate how basic/underrated and sad/happy your songs are :) </p>
                
              </div>
            </div> 
          </div> 
          <div className="key"> 
            <KeyCanvas height={50} width={axisLength} smallFormat={superSmallFormat}/> 
          </div> 
          <MemorizedCanvas className="bigCanvas" draw={draw} 
                            height={axisLength} 
                            width={axisLength} 
                            imageSize={imgSize} 
                            popularity={popularityX} 
                            valence={valenceY}
                            songInfo={songDictionary}
                            smallFormat={smallFormat}/>
        </div>   
      )   
    } 
  }
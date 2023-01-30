import React, { useState, useContext } from 'react'
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { IconContext } from "react-icons";
import { GifContext } from './App';
import { getGifsFromQuery } from './apiFetcher';
import { useSearchParams } from "react-router-dom";

export default function Gifs() {
  const { gifs, setGifs, searchTerm } = useContext(GifContext);
  const [paginator, setPaginator] = useState(0);
  const [query, setQuery] = useSearchParams();

  const buttonStyles = {
    border: "0",
    backgroundColor: "transparent",
    width: "100%",
    paddingTop: "10px"
  }

  const copyGif = async (url) => {
    await navigator.clipboard.writeText(url);
    alert("The gif has been copied!");
  }

  const videoStyle = {
    maxHeight: "300px",
    maxWidth: "100%"
  }

  const getMoreGifs = async (e) => {
    e.preventDefault();
    let tempOffset = paginator+30
    setPaginator(tempOffset);
    const term = searchTerm || query.get("q")
    const result = await getGifsFromQuery(term, tempOffset)
    setGifs(result.data);
    window.scrollTo(0, 0);
  }

  const mappedGifs = gifs?.map((gif) => {
    return (
      <IconContext.Provider key={gif.id} value={{size: "2rem", color: "#6c757d"}}>
        <div className="col-md-4 col-12">
          <div className="card border-secondary text-bg-dark mb-3" style={{height: "390px"}}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <video autoPlay="autoplay" loop={true} muted style={videoStyle}>
                <source src={gif.images.original_mp4.mp4} type="video/mp4" />
              </video>
            </div>
            <div className="card-footer border-secondary"><button style={buttonStyles} onClick={() => copyGif(gif.url)}><HiOutlineClipboardCopy /></button></div>
          </div>
        </div>
      </IconContext.Provider>
    )
  })

  return (
    <div className="container" style={{ marginTop: "100px", marginBottom: "50px" }}>
      <div className="row g-3">
        {mappedGifs}
      </div>
      <div className="d-flex justify-content-center">
        {gifs.length > 3 ? <button onClick={getMoreGifs} className="btn btn-secondary">Show More</button> : null}
      </div>
    </div>
  );
}
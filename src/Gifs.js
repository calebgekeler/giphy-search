import React, { useState, useContext, useCallback } from 'react'
import { GifContext } from './App';
import { getGifsFromQuery } from './apiFetcher';
import { useSearchParams } from "react-router-dom";

export default function Gifs() {
  const { gifs, setGifs, searchTerm } = useContext(GifContext);
  const [paginator, setPaginator] = useState(0);
  const [query, setQuery] = useSearchParams();

  const triggerAlert = useCallback(() => {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `
      <div class="alert alert-success alter-dismissible text-center" role="alert">
        Gif copied!
      </div>
    `
    setTimeout(() => {
      container.innerHTML = "";
    }, 2000)
  })

  const copyGif = async (url) => {
    await navigator.clipboard.writeText(url);
    triggerAlert();
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
    setGifs(prevState => {
      return [...prevState, ...result.data]
    });
  }

  const mappedGifs = gifs?.map((gif) => {
    return (
      <div key={gif.id} className="col-md-4 col-12">
        <div className="card border-secondary text-bg-dark mb-3" style={{height: "390px"}}>
          <div className="card-body d-flex justify-content-center align-items-center">
            <video autoPlay="autoplay" loop={true} muted style={videoStyle}>
              <source src={gif.images.original_mp4.mp4} type="video/mp4" />
            </video>
          </div>
          <div className="card-footer border-secondary d-flex justify-content-center">
            <button className="btn btn-outline-primary" onClick={() => copyGif(gif.url)}>Copy the link!</button>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="container" style={{ marginTop: "100px", marginBottom: "50px" }}>
      <div className="row g-3">
        {mappedGifs}
      </div>
      <div className="d-flex justify-content-center mt-5">
        {gifs.length > 3 ? <button onClick={getMoreGifs} className="btn btn-outline-light">Show More</button> : null}
      </div>
    </div>
  );
}
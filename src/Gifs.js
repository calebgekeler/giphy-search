import React from 'react'
import { HiClipboardCopy } from "react-icons/hi";
import { IconContext } from "react-icons";

export default function Gifs({ gifs, type }) {
  console.log("GIFS", gifs)

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

  const mappedGifs = gifs?.map(gif => {
    return (
      <IconContext.Provider key={gif.slug} value={{size: "2rem", color: "#0d6efd"}}>
        <div className="col-md-4 col-6">
          <div class="card border-secondary text-bg-dark mb-3" style={{height: "390px"}}>
            <div class="card-body d-flex">
              <video autoPlay="autoplay" loop={true} muted width="100%">
                <source src={gif.images.original_mp4.mp4} type="video/mp4" />
              </video>
            </div>
            <div class="card-footer border-secondary"><button style={buttonStyles} onClick={() => copyGif(gif.url)}><HiClipboardCopy /></button></div>
          </div>
        </div>
        {/* <div className="col-md-4 col-6 d-block">
          <video autoPlay="autoplay" loop={true} muted width="100%">
            <source src={gif.images.original_mp4.mp4} type="video/mp4" />
          </video>
          <button style={buttonStyles} onClick={() => copyGif(gif.url)}>
            <HiClipboardCopy />
          </button>
        </div> */}
      </IconContext.Provider>
    )
  })

  return (
    <div className="container my-5">
    {type === "search" && <h2 className="text-center">Gif Results</h2>}
      <div className="row g-3">
        {mappedGifs}
      </div>
    </div>
  );
}
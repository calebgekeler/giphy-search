import { useState, useEffect, createContext } from "react";
import Gifs from "./Gifs";
import { getRandomGifs } from "./apiFetcher";
import NavBar from "./NavBar"
import { useSearchParams } from "react-router-dom";

export const GifContext = createContext(null);

function App() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useSearchParams();

  const containerStyles = {
    position: "fixed", 
    left: "50%", 
    top: "200px", 
    zIndex: "1000", 
    width: "350px",
    marginLeft: "-175px"
  }

  useEffect(() => {

    async function loadRandomGifs() {
      if(!searchTerm.length && !query.get("q")) {
        setGifs(await getRandomGifs(3));
      }
    }

    loadRandomGifs()
  }, [searchTerm])

  return (
    <GifContext.Provider value={{gifs, setGifs, searchTerm, setSearchTerm}}>
      <div id="alertContainer" style={containerStyles} />
      <div className="bg-dark min-vh-100">
        <div className="d-flex flex-column justify-content-center">
          <NavBar />
          <Gifs />
        </div>
      </div>
    </GifContext.Provider>
  );
}

export default App;

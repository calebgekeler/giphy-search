import { useState, useEffect, createContext } from "react";
import Gifs from "./Gifs";
import { getRandomGifs } from "./apiFetcher";
import NavBar from "./NavBar"

export const GifContext = createContext(null);

function App() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    async function loadRandomGifs() {
      if(!searchTerm.length) {
        setGifs(await getRandomGifs(3));
      }
    }

    loadRandomGifs()
  }, [searchTerm])

  return (
    <GifContext.Provider value={{gifs, setGifs, searchTerm, setSearchTerm}}>
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

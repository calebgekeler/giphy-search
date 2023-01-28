import { useState, useEffect } from "react";
import Gifs from "./Gifs";
import { getRandomGifs } from "./apiFetcher";
import NavBar from "./NavBar"

function App() {
  const [searchedGifs, setSearchedGifs] = useState([]);
  const [randomGifs, setRandomGifs] = useState([]);

  useEffect(() => {

    async function loadRandomGifs() {
      setRandomGifs(await getRandomGifs(3));
    }

    loadRandomGifs()
  }, [])

  const gifs = searchedGifs.length ? searchedGifs : randomGifs
  
  // console.log(gifs)
  // console.log("RANDOM GIFS", randomGifs)

  return (
    <div className="bg-dark min-vh-100">
      <div className="d-flex flex-column justify-content-center">
        <NavBar setSearchedGifs={setSearchedGifs} />
        <Gifs gifs={gifs} gifsType={"fixed_height"} />
      </div>
    </div>

  );
}

export default App;

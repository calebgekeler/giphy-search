import React, { useEffect, useContext } from "react";
import { getGifsFromQuery } from "./apiFetcher";
import { useSearchParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { GifContext } from "./App";
import { IconContext } from "react-icons";

export default function Search() {
  const [query, setQuery] = useSearchParams();
  const { searchTerm, setSearchTerm, setGifs } = useContext(GifContext);

  const q = query.get("q")

  useEffect(() => {
    if(searchTerm.length <= 2) {
      setGifs([]);
    }

    if(q) {
      searchGifs(q)
    }

    const delayTimer = setTimeout(() => {
      searchTerm.length > 2 && searchGifs();
      setQuery(searchTerm ? `?q=${searchTerm}` : "");
    }, 500)

    return () => clearTimeout(delayTimer);
  }, [searchTerm])  

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    searchGifs()
  }

  const searchGifs = async (query) => {
    let gifs

    if(query) {
      gifs = await getGifsFromQuery(query);
    } else {
      setQuery(`?q=${searchTerm}`);
      gifs = await getGifsFromQuery(searchTerm);
    }

    setGifs(gifs.data);
  }

  const resetQueries = () => {
    setQuery("");
    setSearchTerm("")
  }

  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <form className="container-fluid d-flex" onSubmit={submitHandler} role="search">
        <div className="input-group">
          <a className="navbar-brand" href="/" onClick={resetQueries}>GIPHY Search</a>
          <input
            aria-describedby="basic-addon1"
            className="form-control"
            onChange={changeHandler} 
            value={searchTerm}
            type="text"
            name="q"
            placeholder="Looking for a GIF?"
          />
          <button className="btn btn-primary" type="submit" id="button-addon1"><AiOutlineSearch /></button>
        </div>
      </form>
    </IconContext.Provider>
  )
}
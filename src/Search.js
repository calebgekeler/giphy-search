import React, { useState, useEffect } from "react";
import { getGifsFromQuery } from "./apiFetcher";
import { useSearchParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search({ setGifs }) {
  const [term, setTerm] = useState("");
  const [query, setQuery] = useSearchParams();

  const q = query.get("q")

  useEffect(() => {
    if(term.length < 2) {
      setGifs([]);
    }

    if(q) {
      searchGifs(q)
    }

  }, [term])  

  const changeHandler = (e) => {
    setTerm(e.target.value);
    // setTimeout(() => {
    //   term.length > 2 && searchGifs(e);
    // }, 500)
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
      setQuery(term);
      gifs = await getGifsFromQuery(term);
    }

    setGifs(gifs.data);
  }



  return (
    <form className="container-fluid d-flex mt-2" onSubmit={submitHandler} role="search">
      <div className="input-group">
        <a className="navbar-brand" href="#">GIPHY Search</a>
        <input
          aria-describedby="basic-addon1"
          className="form-control"
          onChange={changeHandler} 
          value={term}
          type="text"
          name="q"
          placeholder="Looking for a GIF?"
        />
        <button className="btn btn-primary" type="submit" id="button-addon1"><AiOutlineSearch /></button>
      </div>
    </form>
  )
}
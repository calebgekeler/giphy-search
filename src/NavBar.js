import React from "react";
import Search from "./Search";

export default function Navbar({ setSearchedGifs }) {
  return (
    <nav className="navbar bg-body-tertiary border-bottom">
      <Search setGifs={setSearchedGifs} />
    </nav>
  )
}
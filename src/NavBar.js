import React from "react";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav className="navbar fixed-top bg-body-tertiary border-bottom">
      <Search />
    </nav>
  )
}

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Anasayfa</Link>
        </li>
        <li>
          <Link to="/publishers">Yayımcılar</Link>
        </li>
        <li>
          <Link to="/categories">Kategoriler</Link>
        </li>
        <li>
          <Link to="/books">Kitaplar</Link>
        </li>
        <li>
          <Link to="/authors">Yazarlar</Link>
        </li>
        <li>
          <Link to="/purchases">Kitap Alma</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

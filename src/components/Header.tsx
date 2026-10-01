import { Link } from "react-router-dom";

import type { HeaderProps } from "../types/types";

function Header({ shortList }: HeaderProps) {
  return (
    <header className="app-header">
      <Link to="/products">Products</Link>
      <Link to="/shortlist">Shortlist {shortList.length}/4</Link>
      <Link to="/compare">Compare</Link>
    </header>
  );
}
export default Header;

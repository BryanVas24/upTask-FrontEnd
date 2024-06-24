import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <header className="bg-gray-800 py-5">
      <section className="max-w-screen-2xl mx-auto flex justify-between items-center flex-col lg:flex-row">
        <div className="w-64 ">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <NavMenu />
      </section>
    </header>
  );
};

export default Header;

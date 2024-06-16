import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-gray-800 py-5">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center flex-col lg:flex-row">
        <div className="w-64 ">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;

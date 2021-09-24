import Subnav from "./Subnav";

const Navbar = () => {
  return (
    <nav id="navbar-container">
      <Subnav page="Home" />
      <Subnav page="Adoption Centers" />
      <Subnav page="Adoptable Pets" />
      <Subnav page="About" />
    </nav>
  );
};

export default Navbar;

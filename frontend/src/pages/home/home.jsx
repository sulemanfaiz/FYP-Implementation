import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      Welcome to KirayePe! <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link> <br />
      <Link to="/add-property">Add Listing</Link>
    </>
  );
};

export default Home;

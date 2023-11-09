import { Home } from "./pages/Home";
import { Team } from "./pages/Team";

import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/team'>Team</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/team' element={<Team />} />
      </Routes>
    </>
  );
}

export default App;

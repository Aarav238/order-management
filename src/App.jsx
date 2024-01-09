
import Login from "./components/Login";
import Orders from "./components/Orders";
import Edit from "./components/Edit";
import Create from "./components/Create";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// This is the root of the file, Start contributing from here.


function App() {
  return (
    <div className="p-4">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />



      </Routes>
    </BrowserRouter>
    {/* <Login />
      <User />
      <Orders /> */}
    </div>
  );
}

export default App;

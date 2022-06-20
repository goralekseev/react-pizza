import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
//import NotFound from "./pages/NotFound";
//import Cart from "./pages/Cart";
//import FullPizza from "./pages/FullPizza";

const NotFound = lazy(() => import ("./pages/NotFound"));
const FullPizza= lazy(()=>import("./pages/FullPizza"));
const Cart = lazy(() => import(/*webpackChunkName:"Cart"*/ './pages/Cart'))

//export const SearchContext = createContext();

function App() {
  //const [searchValue, setSearchValue] = useState("");

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
            </Suspense>} />
          <Route path='/pizza/:id' element={
            <Suspense fallback={<div>Loading...</div>}> 
            <FullPizza />
            </Suspense>
         } />
          <Route path='*' element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;

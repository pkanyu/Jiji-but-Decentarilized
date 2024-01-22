import './App.scss';
import motoko from './assets/motoko.png';
import AuctionForm from './AuctionForm';
import AuctionList from './AuctionList';
import Navigation from './Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuctionDetail from './AuctionDetail';
import ArtSlider from './ArtSlider';

function App() {
  return (
    <BrowserRouter>
      <div>
        <img src={motoko} className="logo" alt="Motoko logo" />
      </div>
      <div>
        <h2>Featured Collection Pieces</h2>
        <ArtSlider/>
      </div>
      <h1>Buy And Sell HIgh-End Art</h1>
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path="/newAuction" element={<AuctionForm />} />
          <Route path="/viewAuction/:id" element={<AuctionDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import './styles/App.css';
import Header from './header';
import './styles/header.css';
import Hero from './hero.js'
import './styles/hero.css';
import AofM from './artist-of-mount.js';
import './styles/artist-of-mount.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Hero/>
        <AofM/>
      </main>
    </div>
  );
}

export default App;

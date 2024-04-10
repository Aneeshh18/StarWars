import "./App.css";
import Header from "./componets/Header";
import CharactersList from "./componets/CharacterList";

function App() {
  return <div>
    <Header />
    <div className="container mx-auto px-4">
      <CharactersList />
    </div>
  </div>;
}

export default App;

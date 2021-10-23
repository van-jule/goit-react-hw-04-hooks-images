import { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageStateCar from "./components/ImageStateCar";
class App extends Component {
  state = {
    queryValue: "",
  };

  handleFormSubmit = (queryValue) => this.setState({ queryValue });

  render() {
    const { queryValue } = this.state;
    const { handleFormSubmit } = this;

    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageStateCar queryValue={queryValue} />
      </div>
    );
  }
}

export default App;

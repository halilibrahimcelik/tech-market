import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return <div className="App"></div>;
}

export default App;

import { useEffect } from "react";
import AppRouter from "./router/AppRouter";

function App() {
  useEffect(() => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;

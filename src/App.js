import { useEffect } from "react";
import Container from "./components/UI/Container";
import AppRouter from "./router/AppRouter";

function App() {
  useEffect(() => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return (
    <Container>
      <AppRouter />
    </Container>
  );
}

export default App;

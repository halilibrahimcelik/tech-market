import Container from "./components/UI/Container";
import AppRouter from "./router/AppRouter";
import { ToastContainer, Flip } from "react-toastify";
import "swiper/swiper-bundle.css";
function App() {
  return (
    <Container>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
    </Container>
  );
}

export default App;

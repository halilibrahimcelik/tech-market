import Container from "./components/UI/Container";
import AppRouter from "./router/AppRouter";
import { ToastContainer, Flip } from "react-toastify";

function App() {
  return (
    <Container>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={1500}
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

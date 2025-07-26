import { AppRouter } from "@router";

//
import GlobalSnackbar from "@components/common/GlobalSnackbar";

// Redux setup
import { Provider } from "react-redux";
import { store } from "@store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <GlobalSnackbar />
    </Provider>
  );
}

export default App;

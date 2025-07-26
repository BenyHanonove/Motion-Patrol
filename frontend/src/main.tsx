// React core
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// App root components
import App from "./App";
import Root from "./Root.tsx";

import { store, persistor } from "@store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root>
          <App />
        </Root>
      </PersistGate>
    </Provider>
  </StrictMode>
);

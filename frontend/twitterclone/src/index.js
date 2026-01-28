// frontend/twitterclone/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CopilotKit } from "@copilotkit/react-core";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CopilotKit
      publicApiKey="ck_pub_00828bb5867d63cbfb2bbc6f1352e642"
      chatApiEndpoint="/api/chat"
      apiConfiguration={{ debug: true }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Analytics />
        </BrowserRouter>
      </Provider>
    </CopilotKit>
  </React.StrictMode>,
);

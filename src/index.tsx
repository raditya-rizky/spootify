import React from "react";
import ReactDOM from "react-dom/client";
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout.tsx';
import './styles/_main.scss';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CoreLayout>
      <Routes />
    </CoreLayout>
  </React.StrictMode>
);

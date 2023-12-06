import { Provider } from 'mobx-react';
import { stores } from './stores/root-store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tutorials from './containers/Tutorials';
import Tutorial from './containers/Tutorials/Tutorial';

export default function App() {
  return (
    <Provider { ...stores }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tutorials />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

import { Provider } from 'mobx-react';
import { stores } from './stores/root-store';
import Tutorials from './containers/Tutorials';

export default function App() {
  return (
    <Provider { ...stores }>
      <Tutorials />
    </Provider>
  );
}

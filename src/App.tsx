import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';
import './App.scss';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>

      </ErrorBoundary>

    </RecoilRoot>
  );
}

export default App;

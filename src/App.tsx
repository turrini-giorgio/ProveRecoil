import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/form" exact component={FormPage} />
        </Router>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;

const ErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const HomePage = () => {
  return (
    <div className="p-3">
      <h1>Home Page</h1>
      <div className="p-3">
        <div><Link className="fs-5 text-decoration-none" to="/">Home</Link></div>
        <div><Link className="fs-5 text-decoration-none" to="/form">Form</Link></div>
      </div>
    </div>
  )
}
const FormPage = () => {
  return (
    <div className="p-3">
      <h1>Form Page</h1>
      <div className="p-3">
        <div><Link className="fs-5 text-decoration-none" to="/">Home</Link></div>
        <div><Link className="fs-5 text-decoration-none" to="/form">Form</Link></div>
      </div>
    </div>
  )
}
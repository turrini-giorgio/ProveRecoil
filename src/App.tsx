import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.scss'
import { eliminaSdState, listState, sdCurrentState, ServiceDescriptor, UiSdElement, updateState } from './state';

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

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
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
  const lista = useRecoilValue(listState)
  const updateList = useSetRecoilState(updateState)
  const handleUpdate = useSetRecoilState(sdCurrentState(0))
  const handleAdd = () => {
    const sd: ServiceDescriptor = {
      id: 0,
      name: 'new name',
      url: 'https://new.name.net'
    }
    handleUpdate(sd)
  }
  const handleSalva = () => {
    updateList([]);
  }
  return (
    <div className="p-3">
      <h1>Form Page</h1>
      <div className="p-3 d-flex flex-column">
        <div className="mb-4"><Link className="fs-5 text-decoration-none" to="/">Home</Link></div>
        <div className="mb-3">
          <button className="btn btn-primary btn-sm me-3" onClick={handleAdd}>Add</button>
          <button className="btn btn-primary btn-sm" onClick={handleSalva}>Salva</button>
        </div>
        <div>
          {lista && lista.map(el => (<Element uiele={el} key={el.current.id} />))}
        </div>
      </div>
    </div>
  )
}

const Element = ({ uiele }: { uiele: UiSdElement }) => {
  const ele = uiele.current
  const eliminaSd = useSetRecoilState(eliminaSdState(ele.id))
  const updateCurrentSd = useSetRecoilState(sdCurrentState(ele.id))
  const handleOnClick = () => {
    eliminaSd(uiele)
  }
  const setValue = (fieldName: string, value: string) => {
    updateCurrentSd(sd => { 
      const nuovo = ({ ...ele, [fieldName]: value })
      return nuovo
    })
  }
  const setName = (value: string) => setValue('name', value)
  const setUrl = (value: string) => setValue('url', value)
  return (
    <div className="border mb-2 ps-2">
      <div className="row">
        <div className="col-1">Id</div>
        <div className="col-11">{ele.id}</div>
      </div>
      <div className="row">
        <div className="col-1">Name</div>
        <div className="col-5"><input className="form-control form-control-sm" value={ele.name} onChange={ev => setName(ev.target.value)} /></div>
        <div className="col-4">{uiele.old.name}</div>
        <div className="col-2">
          <button className="btn btn-primary btn-sm me-3" onClick={handleOnClick}>Elimina</button>
        </div>
      </div>
      <div className="row">
        <div className="col-1">Url</div>
        <div className="col-5"><input className="form-control form-control-sm" value={ele.url} onChange={ev => setUrl(ev.target.value)} /></div>
        <div className="col-4">{uiele.old.url}</div>
      </div>
    </div>
  )
}

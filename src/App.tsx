import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.scss'
import { eliminaSdState, listaUpdateState, listState, ServiceDescriptor } from './state';
import { useEffect, useState } from 'react';

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
  const handleUpdate = useSetRecoilState(listaUpdateState(0))
  const handleAdd = () => {
    const sd: ServiceDescriptor = {
      id: 0,
      name: 'new name',
      url: 'https://new.name.net'
    }
    handleUpdate(sd)
  }
  return (
    <div className="p-3">
      <h1>Form Page</h1>
      <div className="p-3 d-flex flex-column">
        <div><Link className="fs-5 text-decoration-none" to="/">Home</Link></div>
        <div><Link className="fs-5 text-decoration-none" to="/form">Form</Link></div>
        <div><button className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button></div>
        <div>
          {lista && lista.map(el => (
            <Element ele={el} key={el.id} />
          ))

          }
        </div>
      </div>
    </div>
  )
}

const Element = ({ ele }: { ele: ServiceDescriptor }) => {
  const eliminaSd = useSetRecoilState(eliminaSdState(ele.id))
  const updateSd = useSetRecoilState(listaUpdateState(ele.id))
  const handleOnClick = () => {
    eliminaSd(ele)
  }
  const [name, setName] = useState(ele && ele.name)
  useEffect(() => setName(ele.name), [ele])
  const handleSave = () => {
    updateSd({...ele, name })
  }
  return (
    <div className="border mb-2 ps-2">
      <div className="row">
        <div className="col-3">Id</div>
        <div className="col-9">{ele.id}</div>
      </div>
      <div className="row">
        <div className="col-3">Name</div>
        {/* <div className="col-9">{ele.name}</div> */}
        <div className="col-9"><input value={name} onChange={ev => setName(ev.target.value)} />&nbsp;{ele.name}</div>
      </div>
      <div className="row">
        <div className="col-3">Url</div>
        <div className="col-9">{ele.url}</div>
      </div>
      <div className="row">
        <div className="col-3">&nbsp;</div>
        <div className="col-9">
        <button className="btn btn-primary btn-sm" onClick={handleOnClick}>Elimina</button>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
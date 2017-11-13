import React, {Component} from 'react'
import {render} from 'react-dom'
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducers'


const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

class NewApp extends Component {
    render() {
        return (<Provider store={store}>
            <div className="newClue">
                <App/>
            </div>
        </Provider>);
    }
}

render(
    <NewApp />,
    document.getElementById('root')
)
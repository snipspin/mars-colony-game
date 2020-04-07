import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Header from './Header'
import Content from './Content'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<div className="App-body">
				<Header />
				<Content />
			</div>
   		</BrowserRouter>
  	)
}

export default App

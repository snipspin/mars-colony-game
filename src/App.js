import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Content from './Content'
import './App.css'
function App() {
	return (
		<BrowserRouter>
			<div className="App-body">
				<Content />
			</div>
   		</BrowserRouter>
  	)
}

export default App

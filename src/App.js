import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Content from './Content'
import './App.css'
function App() {
	return (
		<div className="App-body">
			<BrowserRouter>		
					<Content />
   			</BrowserRouter>
   		</div>
  	)
}

export default App

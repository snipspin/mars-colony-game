import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Content from './Content'
import './App.css'
function App() {
	const [cookies, setCookie, removeCookie] = useCookies(['user', 'session'])
	function userOnChange(newUser){
		setCookie('user', newUser, {path: '/'})
	}
	function sessionOnChange(newSession){
		setCookie('session', newSession,{path: '/'})
	}
	function handleCookieLogout(){
		removeCookie('user')
		removeCookie('session')
	}
	return (
		<div className="App-body">
			<BrowserRouter>		
					<Content userOnChange={userOnChange} sessionOnChange={sessionOnChange} handleCookieLogout={handleCookieLogout} />
   			</BrowserRouter>
   		</div>
  	)
}

export default App

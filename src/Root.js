import React from 'react'
import App from './App'
import {CookiesProvider} from 'react-cookie'

function Root() {
	return(
		<CookiesProvider>
			<App />
		</CookiesProvider>
	)
}
export default Root
import React, { useState, useEffect } from 'react'
import './App.scss'
import HomePage from './pages/HomePage'
import NotFound from './components/NotFound'
import OutroPage from './pages/OutroPage'
import PrivacyPage from './pages/PrivacyPage'
import SourcesPage from './pages/SourcesPage'
import AboutPage from './pages/AboutPage'
import UserDataCollection from './pages/UserDataCollection'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import LowCarbonTravelGame from './games/low-carbon-travel/LowCarbonTravelGame'
import CircularEconomyGame from './games/circular-economy/CircularEconomyGame'
import RetrofitHomesGame from './games/retrofit-homes/RetrofitHomesGame'
import NatureGame from './games/nature/NatureGame'
import SustainableFoodGame from './games/sustainable-food-system/SustainableFoodGame'
import CleanEnergyGame from './games/clean-energy/CleanEnergyGame'
import ResearchDevelopmentGame from './games/research-development/ResearchDevelopmentGame'
import Loader from './components/Loader'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'
import ProtectedRoute from './auth/ProtectedRoute'

export const initGA = () => {
	ReactGA.initialize('UA-191743567-1') // put your tracking id here
	ReactGA.pageview(window.location.pathname)
}

const App = () => {
	useEffect(() => {
		initGA()
	}, [])
	// Use React Router History to track pages
	const history = createBrowserHistory()

	// Initialize google analytics page view tracking
	history.listen((location) => {
		ReactGA.set({ page: location.pathname }) // Update the user's current page
		ReactGA.pageview(location.pathname) // Record a pageview for the given page
	})

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [])

	return (
		<>
			{loading === false ? (
				<Router history={history}>
					<Auth0ProviderWithHistory>
						<div className='Layout'>
							<Switch>
								<Route path='/' exact component={HomePage} />
								<Route path='/about'>
									<AboutPage />
								</Route>
								<Route path='/privacy'>
									<PrivacyPage />
								</Route>
								<Route path='/sources'>
									<SourcesPage />
								</Route>
								<Route path='/user' component={UserDataCollection} />
								<Route path='/low-carbon'>
									<LowCarbonTravelGame />
								</Route>
								<Route path='/circular-economy'>
									<CircularEconomyGame />
								</Route>
								<Route path='/retrofit-homes'>
									<RetrofitHomesGame />
								</Route>
								<Route path='/nature'>
									<NatureGame />
								</Route>
								<Route path='/clean-energy'>
									<CleanEnergyGame />
								</Route>
								<Route path='/sustainable-food-system'>
									<SustainableFoodGame />
								</Route>
								<Route path='/research-development'>
									<ResearchDevelopmentGame />
								</Route>
								<Route path='/outro' component={OutroPage} />
								<Route>
									<NotFound />
								</Route>
							</Switch>
						</div>
					</Auth0ProviderWithHistory>
				</Router>
			) : (
				<Loader />
			)}
		</>
	)
}

export default App

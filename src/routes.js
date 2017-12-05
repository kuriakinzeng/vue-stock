import Home from './components/Home.vue'
import PortfolioContainer from './components/portfolio/PortfolioContainer.vue'
import StocksContainer from './components/stocks/StocksContainer.vue'
import StockDetails from './components/stocks/StockDetails.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: PortfolioContainer },
  { path: '/stocks', component: StocksContainer },
  { path: '/stock-details/:id', component: StockDetails }
]
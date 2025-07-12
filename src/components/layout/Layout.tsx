import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className='main-content'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
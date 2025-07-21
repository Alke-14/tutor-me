import { Outlet } from 'react-router'
import Footer from './Footer'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Header from './Header'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <Header />
      <div className='main-content'>
        <main>
          <SidebarTrigger />
          {children}
          <Outlet />
        </main>
        <Footer />
      </div>
    </SidebarProvider>
      
  )
}

export default Layout
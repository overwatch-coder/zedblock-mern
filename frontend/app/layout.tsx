import Footer from './components/Footer'
import Header from './components/Header'
import AuthTodoProvider from './context/authTodoContext'
import './globals.css'

export const metadata = {
  title: 'Zedblock Todos',
  description: 'Create Todo for all your Zedblock Needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className='scroll-smooth overflow-x-hidden font-[poppins]'>
        <AuthTodoProvider>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='mb-auto'>
              {children}
            </main>
            <Footer />
          </div>
        </AuthTodoProvider>
      </body>
    </html>
  )
}

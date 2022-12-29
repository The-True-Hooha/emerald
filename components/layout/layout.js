import Navbar from "../Head/Navbar"
import Footer from "../Footer/Footer"


export default function Layout({ children }){
    return(
        <div>
            <Navbar/>
            <main className="h-full w-full">{children}</main>
            <Footer/>
        </div>
    )
}
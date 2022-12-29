import Link from 'next/link'
export default function Navbar(){
    return(
        <header>
            <nav>
                <div className="pr-[20px]">
                    <ul className="hidden md:flex lg:pl-[150px] font-oxygen text-[#344e41] text-[17px]">
                        <li className="md:ml-16 cursor-pointer">
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li className="md:ml-16 cursor-pointer">
                            <Link href="/about">
                                About
                            </Link>
                        </li>
                        <li className="md:ml-16 cursor-pointer">
                            <Link href="/archive">
                                Archive
                            </Link>
                        </li>
                        <li className="md:ml-16 cursor-pointer">
                            <Link href="/newsletter">
                                Newsletter
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

    )
}
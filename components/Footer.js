export default function Footer(){
    return (
        <div className='bg-primary' id="footer">				
            <footer className="p-4 mx-auto md:flex text-center items-center md:items-center justify-center md:justify-between md:p-6">
                <div className = 'block md:flex md:gap-[0.5em]'>
                    <span className="text-secondary sm:text-center">© 2023 <a href="https://github.com/matjsz" className="hover:underline">Matheus J.G. Silva</a>.</span> 
                    <p className = "text-secondary sm:text-center">All Rights Reserved.</p>
                </div>
                <ul className="flex flex-wrap items-center justify-center mt-4 md:mt-0 text-sm text-secondary">
                    <li>
                        <a href="https://github.com/matjsz" className="mr-4 hover:underline md:mr-6 "><i className="fa-brands fa-github"></i> Github</a>
                    </li>
                    <li>
                        <a href="https://instragram.com/matjs_" className="mr-4 hover:underline md:mr-6"><i className="fa-brands fa-instagram"></i> Instagram</a>
                    </li>
                    <li>
                        <a href="https://github.com/matjsz/thenomad/blob/main/LICENSE" className="hover:underline">Licensing</a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}
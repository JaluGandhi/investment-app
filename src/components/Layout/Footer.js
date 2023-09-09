const Footer = () => {


    const year = new Date().getFullYear();
    return (

        <footer className='main-footer'>
            <div className='footer-left'>
                Copyright &copy; {year} <div className='bullet'></div> Developed By <a href='#'>My Investment</a>
            </div>
            <div className='footer-right'>

            </div>
        </footer>
    );

}

export default Footer;
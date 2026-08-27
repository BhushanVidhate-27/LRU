import '../styles/nav.css';
import Logo from './logo';
import SeeDemo from './seeDemoBtn';
import About from './aboutBtn';
import Hr from './hr';


export default function LandingPage(){
    return(
        <>
        <div className="nav">
            <About />
            <Logo />
            <SeeDemo />
        </div>
        <Hr />
        </>
    );
}

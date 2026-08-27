import '../styles/about.css'

export default function About() {
    return (
        <>
            <div className="all">
                <div className="up">

                    <div className="heading1">
                        LETS <br /> CONNECT'
                    </div>
                    <div className="socials">
                        <div className='btns'>
                            <div className="btn1">Drop Me a Mail @ </div>
                            <div className="btn2">Contact No</div>
                        </div>
                        <div className='links'>
                            <a href="">insta</a>
                            <a href="">LinkedIn</a>
                            <a href="">Github</a>
                        </div>
                    </div>
                </div>
                <div className="down">
                    <div className="sideLines">
                        <span>MADE WITH COFFE AND LOT OF CURIOSITY BY</span>
                    </div>
                    <div className="name">
                        <span>BHUSHAN</span>
                    </div>
                </div>
            </div>
        </>
    );
}
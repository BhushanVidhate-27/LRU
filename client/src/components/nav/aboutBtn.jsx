import '../styles/nav.css';
import Arrow from './arrow';


export default function About() {
    return (
        <>
            <button className="home-btn"
                onClick={() =>
                    document.getElementById("Fourth").scrollIntoView({
                        behavior: "smooth",
                    })
                }
                >
                See About
                <Arrow />
            </button>
        </>
    );
}
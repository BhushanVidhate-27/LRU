import '../styles/nav.css';
import Arrow from './arrow';


export default function SeeDemo() {
    return (
        <>

            <button className="home-btn"
                onClick={() =>
                    document.getElementById("Third").scrollIntoView({
                        behavior: "smooth",
                    })
                }
                >
                See in Working
                <Arrow />
            </button>

        </>
    );
}

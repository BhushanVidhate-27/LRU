export default function BigBtn() {
    return(
        <>
            <div className="hero-btn"
                onClick={() =>
                    document.getElementById("Third").scrollIntoView({
                        behavior: "smooth",
                    })
                }
            >
                Launch Visualizer →
            </div>
        </>
    );
}
export default function Popup({ data }) {
    return (
        <div className="pop-box">
            <h2>Search Result</h2>

            <p>{data.data}</p>
        </div>
    );
}
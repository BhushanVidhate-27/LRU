export default function Box() {
    let col = ["hsl(0, 80%, 27%)"];
    let random = Math.floor(Math.random()*10);
    let val = Math.floor(Math.random()*1000);
    return(
        <>
        <div className="box" style={{backgroundColor: `${col[0]}`}}>
            <div className="key">key : {random}</div>
            <div className="val">val : {val}</div>
        </div>
        <div></div>
        </>
    );
}
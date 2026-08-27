import Popup from "../simulate/popup";
import { useState } from "react";
import "../styles/form.css";

export default function Formbar() {
    const [popupData, setPopupData] = useState(null);
    const [statsData, setStatsData] = useState(null);

    const [inpKey1, setInpKey1] = useState("");
    const [inpVal, setInpVal] = useState("");
    const [inpKey2, setInpKey2] = useState("");
    const [newCap, setNewCap] = useState("");

    // ---------------- ADD ----------------
    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://lru-backend-3yh6.onrender.com/lru", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: inpKey1,
                    val: inpVal,
                }),
            });

            const data = await res.json();
            console.log(data);

            setInpKey1("");
            setInpVal("");
        } catch (err) {
            console.error(err);
        }
    };

    // ---------------- SEARCH ----------------
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://lru-backend-3yh6.onrender.com/lru/${inpKey2}`);
            const data = await res.json();

            console.log(data);

            setPopupData(data);
        } catch (err) {
            console.error(err);
        }
    };

    // ---------------- STATS ----------------
    const handleStats = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://lru-backend-3yh6.onrender.com/lru/stats");
            const data = await res.json();

            console.log(data);

            setStatsData(data);
        } catch (err) {
            console.error(err);
        }
    };

    // ---------------- CHANGE CAPACITY ----------------
    const handleCapacity = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://lru-backend-3yh6.onrender.com/lru/capacity/${newCap}`, {
                method: "POST",
            });

            const data = await res.json();
            console.log(data);

            setNewCap("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {popupData && (
                <div
                    className="popup-overlay"
                    onClick={() => setPopupData(null)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <Popup data={popupData} />
                    </div>
                </div>
            )}

            {statsData && (
                <div
                    className="popup-overlay"
                    onClick={() => setStatsData(null)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className="pop-box">
                            <h2>Cache Stats</h2>
                            <p><strong>Capacity:</strong> {statsData.data.capacity}</p>
                            <p><strong>Size:</strong> {statsData.data.size}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="formSide">
                {/* ADD */}
                <div className="form1">
                    <form onSubmit={handleAdd}>
                        <input
                            type="text"
                            placeholder="Enter Key"
                            value={inpKey1}
                            onChange={(e) => setInpKey1(e.target.value)}
                            required
                        />

                        <br />

                        <input
                            type="text"
                            placeholder="Enter Value"
                            value={inpVal}
                            onChange={(e) => setInpVal(e.target.value)}
                            required
                        />

                        <br />

                        <button type="submit">
                            Add Pair in Cache
                        </button>
                    </form>
                </div>

                {/* SEARCH */}
                <div className="form2">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Enter Key"
                            value={inpKey2}
                            onChange={(e) => setInpKey2(e.target.value)}
                            required
                        />

                        <button type="submit">
                            Search In Cache
                        </button>
                    </form>
                </div>

                {/* STATS */}
                <div className="form2">
                    <form onSubmit={handleStats}>
                        <button type="submit">
                            View Cache Stats
                        </button>
                    </form>
                    <form onSubmit={handleCapacity}>
                        <input
                            type="number"
                            placeholder="Enter New Capacity"
                            value={newCap}
                            onChange={(e) => setNewCap(e.target.value)}
                            required
                            min="1"
                        />

                        <button type="submit">
                            Change Capacity
                        </button>
                    </form>
                </div>

            </div>
        </>
    );
}
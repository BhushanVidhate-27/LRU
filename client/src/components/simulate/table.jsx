import { useEffect, useState } from 'react';
import '../styles/simulate.css';


export default function Table() {
    const API = "https://lru-backend-3yh6.onrender.com";
    const [data, setData] = useState([]);

    async function loadData() {
        const res = await fetch(`${API}/lru`);

        const json = await res.json();

        console.log(json);
        console.log("state =", data, Array.isArray(data));

        setData(json);
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (key) => {
        try {
            const res = await fetch(`${API}/lru/${key}`, {
                method: "DELETE",
            });

            const json = await res.json();
            console.log(json);

            await loadData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <div className="table-1">
            <table border={1}>
                <thead>
                    <tr>
                        <td style={{textAlign: "center"}}>
                            key
                        </td>
                        <td style={{textAlign: "center"}}>
                            value
                        </td>
                        <td style={{textAlign: "center"}}>
                            action
                        </td>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((ele) => {
                        return (<tr key={ele.key}>
                            <td>{ele.key}</td>
                            <td>{ele.val}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(ele.key)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>);
                    })
                }
                </tbody>
            </table>
            </div>
        </>
    );
}
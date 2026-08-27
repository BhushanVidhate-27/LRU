import express from "express";
import fs from 'fs';
import { spawn } from "child_process";
export const app = express();
let port = 8080;
let cppProcess;
app.use(express.json());

const asyncHandler = fn =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

async function main() {
    if (fs.existsSync("./lru")) {
        fs.unlinkSync("./lru");
    }

    await compileLRU();
    cppProcess = spawn("./lru");
    cppProcess.stdout.setEncoding("utf8");

    cppProcess.stderr.on("data", err =>
        console.error(err.toString())
    );

    cppProcess.on("close", async () => {
        console.log("Restarting LRU...");

        try {
            await compileLRU();
            cppProcess = spawn("./lru");
        } catch (err) {
            console.error(err);
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

main().catch(console.error);

let queue = Promise.resolve();1

function sendCommand(command) {
    if (!cppProcess || cppProcess.killed) {
        main().catch(console.error);
    }
    queue = queue.then(() => {
        return new Promise((resolve, reject) => {

            const timer = setTimeout(() => {
                cppProcess.stdout.off("data", listener);
                reject(new Error("Timeout"));
            },
            5000);

            let buffer = "";

            const listener = (data) => {
                buffer += data.toString();

                if (buffer.includes("END\n")) {
                    clearTimeout(timer);
                    cppProcess.stdout.off("data", listener);
                    resolve(buffer.replace("END\n", "").trim());
                }
            };
            if (!cppProcess.stdin.writable) {
                reject(new Error("LRU process is closed"));
                return;
            }
            cppProcess.stdout.on("data", listener);
            cppProcess.stdin.write(command);
        });
    });

    return queue;
}

function compileLRU() {
    return new Promise((resolve, reject) => {
        const compile = spawn("g++", ["LRU.cpp", "-o", "lru"]); 
        compile.stderr.on("data", data => {
            console.error(data.toString());
        });
        compile.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error("CompilationError"));
            }
        });
    });
}


//homepage
app.get("/", (req, res) => {
    res.send("This is Homepage");
});


app.get("/lru", asyncHandler(async (req, res) => {
    const result = await sendCommand("1\n");
    console.log(result);
    const kv = result
        .trim()
        .split("\n")
        .map(line => {
            const match = line.match(/Key\s*:(\d+)\s*val\s*:(.*)/);

            if (!match) return null;

            return {
                key: Number(match[1]),
                val: match[2]
            };
        })
        .filter(Boolean);
    res.json(kv);
}));


app.get("/lru/stats", asyncHandler(async (req, res) => {

    const result = await sendCommand(`8\n`);
    const lines = result.trim().split("\n");
    const stats = {};

    lines.forEach(line => {
        const match = line.match(/(\w+)\s*:(.*)/);
        if (match) {
            stats[match[1].toLowerCase()] = match[2].trim();
        }
    });

    res.json({
        success: true,
        data: stats
    });
}));

app.get("/lru/capacity", asyncHandler(async (req, res) => {
    const result = await sendCommand(`6\n`);
    res.json({
        success: true,
        data: result
    });
}));

app.post("/lru/capacity/:newCap", asyncHandler(async (req, res) => {
    let { newCap } = req.params;

    const result = await sendCommand(`7\n${newCap}\n`);
    res.json({
        success: true,
        data: result
    });
}));

app.get("/lru/:key", asyncHandler(async (req, res) => {
    const { key } = req.params;

    const result = await sendCommand(`2\n${key}\n`);
    res.json({
        success: true,
        data: result
    });
}));

app.post("/lru", asyncHandler(async (req, res) => {
    let { key = Math.floor(Math.random() * 50), val = "This is default val" } = req.body;

    const result = await sendCommand(`3\n${key}\n${val}\n`);
    res.json({
        success: true,
        data: result
    });

}));


app.patch("/lru/:key", asyncHandler(async (req, res) => {
    const key = req.params.key;
    let { val = "This is default val" } = req.body;

    const result = await sendCommand(`3\n${key}\n${val}\n`);
    res.json({
        success: true,
        data: result
    });
}));


app.delete("/lru/:key", asyncHandler(async (req, res) => {
    let { key } = req.params;

    const result = await sendCommand(`4\n${key}\n`);
    res.json({
        success: true,
        data: result
    });
}));


app.delete("/lru", asyncHandler(async (req, res) => {

    const result = await sendCommand(`5\n`);
    res.json({
        success: true,
        data: result
    });
}));


app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        error: err.message
    });
});
/*
GET     /lru
GET     /lru/:key
POST    /lru
PATCH   /lru/:key
DELETE  /lru/:key
DELETE  /lru


GET     /capacity
PATCH   /capacity

GET     /stats
DELETE  /stats

GET     /history
DELETE  /history
*/
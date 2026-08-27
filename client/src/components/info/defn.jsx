import '../styles/info.css'

export default function Defn() {
    return (
        <>
            <section className="defn">

                <div className="q1">
                    <div className="question">
                        <h3>What is an LRU Cache?</h3>
                    </div>
                    <div className="answer">
                        <p>
                            An <strong>LRU (Least Recently Used) Cache</strong> is a data
                            structure that stores a fixed number of key-value pairs. When
                            the cache reaches its capacity, it automatically removes the
                            item that has not been accessed for the longest time. It is
                            commonly implemented using a <strong>Hash Map</strong> and a
                            <strong> Doubly Linked List</strong> to achieve efficient
                            operations.
                        </p>
                    </div>
                </div>

                <div className="q1">
                    <div className="question">

                        <h3>What is the time complexity?</h3>
                    </div>
                    <div className="answer">

                        <p>
                            <strong>get(key):</strong> O(1) average <br />
                            <strong>put(key, value):</strong> O(1) average <br />
                        </p>
                    </div>

                </div>

                <div className="q1">
                    <div className="question">

                        <h3>How does an LRU Cache work?</h3>
                    </div>
                    <div className="answer">

                        <p>
                            Every time a key is accessed, it becomes the
                            <strong> most recently used</strong> item and moves to the
                            front of the cache. When a new item is inserted and the cache
                            is full, the <strong>least recently used</strong> item is
                            removed before adding the new entry.
                        </p>
                    </div>

                </div>

                <div className="q1">
                    <div className="question">
                        <h3>Where is an LRU Cache used?</h3>
                    </div>
                    <div className="answer">

                        <p>
                            LRU caches are widely used in operating systems, web
                            browsers, databases, CDNs, and applications to cache
                            frequently accessed data while minimizing memory usage.
                        </p>
                    </div>

                </div>

                <div className="q1">
                    <div className="question">
                        <h3>Who is this visualizer for?</h3>
                    </div>
                    <div className="answer">

                        <p>
                            This visualizer is designed for computer science students,
                            coding interview preparation, and anyone learning data
                            structures. It helps you understand cache operations through
                            interactive step-by-step visualization.
                        </p>
                    </div>

                </div>

                <div className="q1">
                    <div className="question">
                        <h3>What data structures are used internally?</h3>
                    </div>
                    <div className="answer">

                        <p>
                            An efficient LRU Cache combines a
                            <strong> Hash Map</strong> for O(1) lookups with a
                            <strong> Doubly Linked List</strong> to maintain the order of
                            recently used items.
                        </p>
                    </div>
                </div>

            </section>
        </>
    );
}
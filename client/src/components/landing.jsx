import './landing.css'
import Defn from './info/defn'
import BigBtn from './hero/bigBtn';
import LL from './hero/ll';
import MainText from './hero/mainText';
import Scroll from './hero/scroll';
import Nav from './nav/nav';
import First from './pages/first';
import Second from './pages/second';
import Third from './pages/third';
import Fourth from './pages/fourth';

export default function LandingPage() {
    return (
        <>
            <div className="all-page">
                <section id='First'>
                    <First />
                </section>
                <section id='Second'>
                    <Second />
                </section>
                <section id='Third'>
                    <Third />
                </section>
                <section id='Fourth'>
                    <Fourth />
                </section>
            </div>
        </>
    );
};
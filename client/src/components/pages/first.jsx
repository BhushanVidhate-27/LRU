import BigBtn from '../hero/bigBtn';
import LL from '../hero/ll';
import MainText from '../hero/mainText';
import Scroll from '../hero/scroll';
import Nav from '../nav/nav';

export default function First() {
    return(
        <>
            <div className="hero">
                    <Nav />
                    <MainText />
                    <Scroll />
                    <LL />
                    <BigBtn />
            </div>
        </>
    );
}
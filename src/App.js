import {Component, useState, useEffect, useCallback, useMemo, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 1
// class Slider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }
//
//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }
//
//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }
//
//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

// const calcValue = () => {
//     console.log('random');
//
//     return Math.random() * (50 - 1) + 1 ;
// }


// 2
/*
const countTotal = (num) => {
    console.log('Counting...');
    return num + 10;
};

const Slider = (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoPlay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('Fetching');
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
        ]
    }, [slide]);

    function logger() {
        console.log('Log!');
    }

    useEffect(() => {
        console.log('Effect')
        document.title = `Slide: ${slide}`;

        window.addEventListener("click", logger);

        return () => {
            window.removeEventListener("click", logger)
        }
    }, [slide]);

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        setAutoPlay(autoplay => !autoplay);
    }

    // Другой вариант, более замудренный
    // const [state, setState] = useState({slide: 0, autoplay: false});
    //
    // function changeSlide(i) {
    //     setState(state => ({...state, slide: state.slide + i}));
    // }
    //
    // function toggleAutoplay() {
    //     setState(state => ({...state, autoplay: !state.autoplay}));
    // }

    // const total = countTotal(slide);
    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    // const style = {
    //     color: slide > 4 ? 'red' : 'black'
    // }

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide]);

    useEffect(() => {
        console.log('Styles!');
    }, [style]);

    return (
        <Container>
            <div className="slider w-50 m-auto">
                {/!*{
                    getSomeImages().map((url, i) => {
                        return (
                            <img key={i} className="d-block w-100" src={url} alt="slide"/>
                        )
                    })
                }*!/}
                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide: {slide} <br/>{autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slide: {total}</div>
                <div className="buttons mt-3">
                    <button className="btn btn-primary me-2" onClick={() => changeSlide(-1)}>-1</button>
                    <button className="btn btn-primary me-2" onClick={() => changeSlide(1)}>+1</button>
                    <button className="btn btn-primary me-2" onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages());
    }, [getSomeImages]);

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide"/>)}
        </>
    )
}

function App() {
    const [slide, setSlider] = useState(true);

    return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            {slide ? <Slider/> : null}
        </>
    );
}

export default App;
*/

// 3
function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            return {autoplay: !state.autoplay};
        case 'slow':
            return {autoplay: 300};
        case 'fast':
            return {autoplay: 700};
        case 'custom':
            return {autoplay: action.payload}
        default:
            throw new Error();
    }
}

function init(initial) {
    return {autoplay: initial}
}

const Slider = ({initial}) => {
    const [slide, setSlide] = useState(0);
    // const [autoplay, setAutoplay] = useState(false);
    const [autoplay, dispatch] = useReducer(reducer, initial, init);

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>slow autoplay</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fast'})}>fast autoplay</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
    )
}

function App() {
    return (
        <Slider initial={false}/>
    );
}

export default App;

var slides = [
    {
        'img': 'img/1.png'
    },
    {
        'img': 'img/2.png'
    },
    {
        'img': 'img/3.png'
    },
    {
        'img': 'img/4.png'
    },
    {
        'img': 'img/51.png'
    },
    {
        'img': 'img/5.png'
    },
    {
        'img': 'img/6.png'
    }
];


var PrevButton = React.createClass({
    render: function() {
        return (
            <button className="prev"
                    onClick={this.handleClick}>
                previous
            </button>
        );
    },
    handleClick: function(e) {
        this.props.slideshow.prevSlide();
    }
});

var NextButton = React.createClass({
    render: function() {
        return (
            <button className="next"
                    onClick={this.handleClick}>
                next
            </button>
        );
    },
    handleClick: function(e) {
        this.props.slideshow.nextSlide();
    }
});

var SlideDisplay = React.createClass({
    render: function() {
        var slide = this.props.slides[this.props.currentSlide];
        console.log(window.innerHeight);
        return (
            <div className="slide">
                <div className="img"
                     style={{
                         backgroundImage: 'url(' + slide.img + ')',
                         height: window.innerHeight
                     }} />
            </div>
        );
    }
});

var Slideshow = React.createClass({
    getInitialState: function() {
        return {
            'currentSlide': 0
        };
    },
    prevSlide: function() {
        var newSlide = this.state.currentSlide;
        if (this.state['currentSlide'] > 0) {
            newSlide = newSlide - 1;
        }
        this.setState({'currentSlide': newSlide});
    },
    nextSlide: function() {
        var newSlide = this.state.currentSlide;
        if (this.state.currentSlide < slides.length - 1) {
            newSlide = newSlide + 1;
        }
        this.setState({'currentSlide': newSlide});
    },
    componentWillMount: function() {
        document.addEventListener('keydown', this.handleKeyDown, false);
    },
    handleKeyDown: function(e) {
        if (e.keyCode === 37) {
            this.prevSlide();
        } else if (e.keyCode === 39) {
            this.nextSlide();
        }
    },
    render: function() {
        return (
            <div className="slideshow" onKeyPress={this.handleKeyDown}>
                <SlideDisplay
                    slides={slides}
                    currentSlide={this.state.currentSlide} />
                <PrevButton slideshow={this} />
                <NextButton slideshow={this}  />
            </div>
        );
    }
});

ReactDOM.render(
    <Slideshow />,
    document.getElementById('slideshow')
);

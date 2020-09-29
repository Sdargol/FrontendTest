import React from 'react';

class PreviewVideoViewer extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickVideo = this.handleClickVideo.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClickPlay = this.handleClickPlay.bind(this);

        this.state = {
            autoplay: true,
            displayPlayBtn: true,
            displayControls: false
        }

        this.videoRef = React.createRef();
    }


    handleClickVideo(event) {
        //console.log(this.videoRef.current.getBoundingClientRect());
        //console.log(document.documentElement.clientHeight);
        console.log(this.videoRef.current);

    }

    handleClickPlay() {
        this.props.handleClick();

        if (this.props.refPlayVideo) this.props.refPlayVideo.pause();

        this.videoRef.current.play();

    }

    handleScroll() {

        if (this.props.autoplay) {

            let _element = this.videoRef.current.getBoundingClientRect();
            let _center = Math.floor(document.documentElement.clientHeight / 2);

            if (_element.top < _center) {
                if (_element.bottom > _center) {
                    this.setState({ displayPlayBtn: false });
                    this.props.setRef(this.videoRef.current);
                    this.videoRef.current.play();
                }
            }

            if (_element.bottom < _center) {
                this.setState({ displayPlayBtn: true });
                this.props.setRef(null);
                this.videoRef.current.pause();
            }

            if (_element.top > _center) {
                if (_element.bottom > _center) {
                    this.setState({ displayPlayBtn: true });
                    this.props.setRef(null);
                    this.videoRef.current.pause();
                }
            }

        }


    }

    componentDidMount() {
        let md = new window.MobileDetect(window.navigator.userAgent);

        if (md.mobile()) this.props.handleClick();

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {

        let _playBtn;

        if (this.props.displayPlayBtn && this.state.displayPlayBtn) {
            _playBtn = <div onClick={this.handleClickPlay} className="video_play">►</div>
        }

        let _calcYear = (year, propsLanguage) => {
            if ((year % 10) > 1 && (year % 10) < 5) {
                return propsLanguage.ot_year;
            }

            if ((year % 10) === 1) {
                return propsLanguage.year;
            }

            return propsLanguage.years;
        }

        let _year = _calcYear(this.props.age, this.props.language[this.props.language.select]);

        return (

            <div style={this.props._objClassCard} className="RowViewer_card">

                {/* <div className="RowViewer_card_content">
                        <div className="t-avatar">{this.props.name}</div>
                        <div className="t-age">{this.props.age}</div>
                        <div className="t-number">{this.props.phone}</div>
                        <div className="t-subscribe">{this.props.phrase}</div>
                    </div> */}

                <div className="PreviewViewer_card_no_video">

                    <div className="PreviewViewer_card_inner">

                        <div className="PreviewViewer_avatar_container">
                            <div className="RowViewer_avatar_container">
                                <div className="RowViewer_avatar">
                                    <img src={(() => "/images/" + this.props.image + ".svg")()} alt="Avatar" />
                                </div>

                                <div style={this.props._objClassAnimName} className="RowViewer_name">{this.props.name}</div>
                            </div>

                            <div onClick={(e) => this.props.handleClickFavourite(e, this.props.id)} className="RowViewer_favorites">
                                <svg className={this.props.favourite ? "active" : ""} xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                                    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
                                </svg>
                            </div>

                        </div>

                        <div style={this.props._objClassAnimText} className="RowViewer_number">{this.props.age} {_year}</div>
                        <div style={this.props._objClassAnimText} className="RowViewer_number">{this.props.phone}</div>
                        <div style={this.props._objClassAnimPhrase}>{this.props.phrase}</div>

                    </div>
                </div>

                <div style={this.props._objClassAnimPhrase} className="RowViewer_card_video" >

                    {_playBtn}

                    <video ref={this.videoRef} onPlay={this.handleClickVideo} width="340" controls={this.props.displayControls} loop muted key={this.props.name}  >
                        <source src={(() => "/videos/" + this.props.video + ".mp4")()} type="video/mp4" />
                            Video
                        </video>
                </div>

            </div>

        )
    }
}

export default PreviewVideoViewer;
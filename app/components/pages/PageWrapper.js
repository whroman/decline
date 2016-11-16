import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'axios';
import { random } from 'lodash';

const getDateString = (offset) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() is zero-indexed, API is not.
    const day = today.getDate() - 7; // A week in the past, to have better odds of that NASA has finised uploading assets
    const dateString = `${year}-${month}-${day}`;
    return dateString;
}

let POTD_MAX_REQUESTS = 3;

export default class PageWrapper extends Component {

    static get propTypes() {
        return {
            children: PropTypes.element.isRequired
        };
    }

    applyBGImage (imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        const dateOfToday = (new Date).getDate();
        localStorage.setItem('potd', JSON.stringify({
            date: dateOfToday,
            url: imageUrl
        }));
    }

    requestRandomBGImage (dayOffset) {
        const dateString = getDateString(dayOffset);
        const apiKey = 'wTOvHOBQWXzc8rlGtCxU16RxOJocS2lLumsKk35k';
        // Offset date because pics of today are posted after today.
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=${apiKey}`

        get(url).then((response) => {
            const { photos } = response.data;
            const photoIndex = random(photos.length - 1);
            const imageUrl = photos[photoIndex].img_src;
            this.applyBGImage(imageUrl);
        }, () => {
            POTD_MAX_REQUESTS -= 1;
            if (POTD_MAX_REQUESTS > 0) this.requestRandomBGImage(dayOffset - 1);
        });
    }

    componentWillMount () {
        const todayAtMidnight = new Date();
        todayAtMidnight.getDate();

        const dateOfToday = (new Date).getDate();
        const potd = JSON.parse(localStorage.getItem('potd'));
        if (potd) {
            if (potd.date < dateOfToday) {
                this.requestRandomBGImage(0);
            } else {
                this.applyBGImage(potd.url)
            }
        } else {
            this.requestRandomBGImage(0);
        }
    }

    renderRight () {
        return (
            <div className='right-links'>
                <Link to='/practice'>{ 'Practice' }</Link>
                <Link to='/about'>{ 'About' }</Link>
            </div>
        );
    }

    render () {
        return (
            <div>
                <div className='header'>
                    <div className='row collapse'>
                        <div className='column small-12'>
                            <h1 className='float-left header-title'>{ 'Tägliches Deutsch' }</h1>
                            { this.renderRight() }
                        </div>
                    </div>
                </div>
                <br/>

                { this.props.children }
                <br/>
                <br/>

            </div>
        );
    }

}
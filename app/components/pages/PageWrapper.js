import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'axios';
import { random } from 'lodash';

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
        }))
    }

    requestRandomBGImage () {
        const today = new Date();
        const apiKey = 'wTOvHOBQWXzc8rlGtCxU16RxOJocS2lLumsKk35k';
        // Offset date because pics of today are posted after today.
        const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 2}`;
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=${apiKey}`
        get(url).then((response) => {
                const { photos } = response.data;
                const photoIndex = random(photos.length);
                const imageUrl = photos[photoIndex].img_src;
                this.applyBGImage(imageUrl);
            });
    }

    componentWillMount () {
        const todayAtMidnight = new Date();
        todayAtMidnight.getDate();

        const dateOfToday = (new Date).getDate();
        const potd = JSON.parse(localStorage.getItem('potd'));
        if (potd) {
            if (potd.date < dateOfToday) {
                this.requestRandomBGImage();
            } else {
                this.applyBGImage(potd.url)
            }
        } else {
            this.requestRandomBGImage();
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
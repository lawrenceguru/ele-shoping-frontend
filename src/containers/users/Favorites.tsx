import React, { Component } from 'react'

interface Props {

}


export default class Favorites extends Component<Props, {}> {

    render() {
        return (
            <div>
                <section className="uk-section uk-section-small">
                    <div className="uk-container">
                        <div className="uk-grid-medium" data-uk-grid>
                            <div className="uk-width-1-1 uk-width-1-4@m tm-aside-column">
                                <div className="uk-card uk-card-default uk-card-small tm-ignore-container" data-uk-sticky="offset: 90; bottom: true; media: @m;">
                                    
                                </div>
                            </div>
                            <h1> My Favorites</h1>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

import React, { Component } from 'react'

interface Props {

}
interface State {

}

class Footer extends Component<Props, State> {
    state = {}

    render() {
        return (
            <footer id="footer">
                <section className="uk-section uk-section-secondary uk-section-small uk-light">
                    <div className="uk-container uk-container-xlarge">
                        <div className="uk-grid-small uk-child-width-1-1 uk-child-width-1-4@m uk-grid">
                            <div>
                                <a className="uk-text-xlarge" href="/">Letzell.</a><br/>
                                <span className="uk-text-small">Buy and sell for fast locally.</span>
                            </div>
                            <div>
                                <nav className="uk-grid-small uk-child-width-1-2 uk-grid">
                                    <div>
                                        <ul className="uk-nav uk-nav-default">
                                            <li><a href="/listings/new">List an Item</a></li>
                                            <li><a href="/faq">FAQ</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="uk-nav uk-nav-default">
                                            <li><a href="/about">About</a></li>
                                            <li><a href="/blog">Blog</a></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div>
                                <ul className="uk-nav uk-nav-default">
                                    <li><a href="/terms">Terms and Conditions</a></li>
                                    <li><a href="/privacy">Privacy Policy</a></li>
                                    <li><a href="/cookie">Cookie Policy</a></li>
                                </ul>
                            </div>
                            <div>
                                <ul className="uk-iconnav">
                                    <li><a href="#" title="Facebook" uk-icon="facebook"></a></li>
                                    <li><a href="#" title="Twitter" uk-icon="twitter"></a></li>
                                    <li><a href="#" title="YouTube" uk-icon="youtube"></a></li>
                                    <li><a href="#" title="Instagram" uk-icon="instagram"></a></li>
                                </ul>
                                <div className="uk-margin uk-text-small uk-text-muted">
                                    @ Copyright Letzell.com
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        )
    }
}

export default Footer

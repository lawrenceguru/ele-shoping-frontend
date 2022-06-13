import React, { Component } from 'react'

interface Props {

}

export default class News extends Component<Props, {}> {

    render() {
        return (
            <main>
                <section className="uk-section uk-section-xsmall">
                    <div className="uk-container uk-container-xlarge">
                        <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                            <div className="uk-text-left">
                                <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                                    <li><a href="/">Home</a></li>
                                    <li><span>News</span></li>
                                </ul>
                            </div>
                            <div>
                                <div className="uk-grid-medium" data-uk-grid>
                                    <aside className="uk-width-1-6 uk-visible@m tm-aside-column">
                                        <section className="uk-card uk-card-default uk-card-small" data-uk-sticky="offset: 90; bottom: true;">
                                            <nav>
                                                <ul className="uk-nav uk-nav-default tm-nav">
                                                    <li><a href="/about">About</a></li>
                                                    <li><a href="/blog">Blog</a></li>
                                                    <li className="uk-active"><a href="/news">News</a></li>
                                                    <li><a href="/faq">FAQ</a></li>
                                                </ul>
                                            </nav>
                                        </section>
                                    </aside>
                                    <section className="uk-width-1-1 uk-width-expand@m">
                                        <section className="uk-card uk-card-default uk-card-small uk-card-body tm-ignore-container">
                                            <ul className="uk-list uk-list-large uk-list-divider">
                                                <li>
                                                    <article className="uk-article">
                                                        <div className="uk-article-body">
                                                            <div className="uk-article-meta uk-margin-xsmall-bottom">
                                                                <time>June 4, 2018</time>
                                                            </div>
                                                            <div>
                                                                <h3><a className="uk-link-heading" href="article.html">Highlights from WWDC</a></h3>
                                                            </div>
                                                            <div className="uk-margin-small-top"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales eget ipsum id aliquam. Nam consectetur interdum nibh eget sodales. Cras volutpat efficitur ornare.</p></div>
                                                        </div>
                                                    </article>
                                                </li>
                                                <li>
                                                    <article className="uk-article">
                                                        <div className="uk-article-body">
                                                            <div className="uk-article-meta uk-margin-xsmall-bottom">
                                                                <time>June 4, 2018</time>
                                                            </div>
                                                            <div>
                                                                <h3><a className="uk-link-heading" href="article.html">Apple introduces macOS Mojave</a></h3>
                                                            </div>
                                                            <div className="uk-margin-small-top"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales eget ipsum id aliquam. Nam consectetur interdum nibh eget sodales. Cras volutpat efficitur ornare.</p></div>
                                                        </div>
                                                    </article>
                                                </li>
                                                <li>
                                                    <article className="uk-article">
                                                        <div className="uk-article-body">
                                                            <div className="uk-article-meta uk-margin-xsmall-bottom">
                                                                <time>May 29, 2018</time>
                                                            </div>
                                                            <div>
                                                                <h3><a className="uk-link-heading" href="article.html">iOS 11.4 brings stereo pairs and multi-room audio with AirPlay 2</a></h3>
                                                            </div>
                                                            <div className="uk-margin-small-top"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales eget ipsum id aliquam. Nam consectetur interdum nibh eget sodales. Cras volutpat efficitur ornare.</p></div>
                                                        </div>
                                                    </article>
                                                </li>
                                            </ul>
                                        </section>
                                    </section>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

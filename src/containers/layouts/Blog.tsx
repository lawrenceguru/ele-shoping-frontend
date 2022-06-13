import React, { Component } from 'react'

interface Props {

}

export default class Blog extends Component<Props, {}> {

    render() {
        return (
            <main>
                <section className="uk-section uk-section-xsmall">
                    <div className="uk-container uk-container-xlarge">
                        <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                            <div className="uk-text-left">
                                <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                                    <li><a href="/">Home</a></li>
                                    <li><span>Blog</span></li>
                                </ul>
                            </div>
                            <div>
                                <div className="uk-grid-medium" data-uk-grid>
                                    <aside className="uk-width-1-6 uk-visible@m tm-aside-column">
                                        <section className="uk-card uk-card-default uk-card-small" data-uk-sticky="offset: 90; bottom: true;">
                                            <nav>
                                                <ul className="uk-nav uk-nav-default tm-nav">
                                                    <li><a href="/about">About</a></li>
                                                    <li className="uk-active"><a href="/blog">Blog</a></li>
                                                    <li><a href="/news">News</a></li>
                                                    <li><a href="/faq">FAQ</a></li>
                                                </ul>
                                            </nav>
                                        </section>
                                    </aside>
                                    <section className="uk-width-1-1 uk-width-expand@m">
                                        <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                                            <div><a href="article.html">
                                                <article className="uk-card uk-card-default uk-card-small uk-article uk-overflow-hidden uk-box-shadow-hover-large uk-height-1-1 tm-ignore-container">                                                 
                                                    <div className="uk-card-body">
                                                        <div className="uk-article-body">
                                                            <div className="uk-article-meta uk-margin-xsmall-bottom">
                                                                <time>May 21, 2018</time>
                                                            </div>
                                                            <div>
                                                                <h3 className="uk-margin-remove">Everything You Need to Know About the MacBook Pro</h3>
                                                            </div>
                                                            <div className="uk-margin-small-top"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales eget ipsum id aliquam. Nam consectetur interdum nibh eget sodales. Cras volutpat efficitur ornare.</p></div>
                                                        </div>
                                                    </div>
                                                </article></a>
                                            </div>
                                            <div><a href="article.html">
                                                <article className="uk-card uk-card-default uk-card-small uk-article uk-overflow-hidden uk-box-shadow-hover-large uk-height-1-1 tm-ignore-container">                                                  
                                                    <div className="uk-card-body">
                                                        <div className="uk-article-body">
                                                            <div className="uk-article-meta uk-margin-xsmall-bottom">
                                                                <time>May 21, 2018</time>
                                                            </div>
                                                            <div>
                                                                <h3 className="uk-margin-remove">Apple introduces macOS Mojave</h3>
                                                            </div>
                                                            <div className="uk-margin-small-top"><p>Praesent consequat justo eu massa malesuada posuere. Donec ultricies tincidunt nisl, sed euismod nulla venenatis maximus. Maecenas sit amet semper tellus. Pellentesque imperdiet finibus sapien, a consectetur eros auctor a.</p></div>
                                                        </div>
                                                    </div>
                                                </article></a>
                                            </div>
                                        </div>
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

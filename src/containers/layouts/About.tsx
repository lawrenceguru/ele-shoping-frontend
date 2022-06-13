import React, { Component } from 'react'

interface Props {

}

export default class About extends Component<Props, {}> {

    render() {
        return (
            <main>
                <section className="uk-section uk-section-xsmall">
                    <div className="uk-container uk-container-xlarge">
                        <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                            <div className="uk-text-left">
                                <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                                    <li><a href="/">Home</a></li>
                                    <li><span>About</span></li>
                                </ul>
                            </div>
                            <div>
                                <div className="uk-grid-medium" data-uk-grid>
                                    <aside className="uk-width-1-6 uk-visible@m tm-aside-column">
                                        <section className="uk-card uk-card-default uk-card-small" data-uk-sticky="offset: 90; bottom: true;">
                                            <nav>
                                                <ul className="uk-nav uk-nav-default tm-nav">
                                                    <li className="uk-active"><a href="/about">About</a></li>
                                                    <li><a href="/blog">Blog</a></li>
                                                    <li><a href="/news">News</a></li>
                                                    <li><a href="/faq">FAQ</a></li>
                                                </ul>
                                            </nav>
                                        </section>
                                    </aside>
                                    <section className="uk-width-1-1 uk-width-expand@l">
                                    <article className="uk-card uk-card-default uk-card-body uk-article tm-ignore-container">
                                                    <header className="uk-text-center">
                                                        <h1 className="uk-article-title">About</h1>
                                                    </header>
                                                    <div className="uk-article-body">
                                                        <p className="uk-text-lead uk-text-justify">Letzell is a consumer-to-consumer online marketplace that was founded in 2022 and targets customers within the United States. At Letzell, buyers and sellers unite to meet in person and make simple, hassle-free transactions.</p>
                                                        <p>Letzell’s website is clutter-free, safe, and guarantees the privacy of its customers. There are no pop-ups or email notifications that would disturb customers. The transactions are privacy-friendly and also user-friendly. The user's location or cookies are not tracked so that all surfing can be done comfortably. Encryption of the data s done on a secure database. Moreover, Letzell’s website offers authentication of existing customers without passwords. Users don't have to remember the password to log in every time they access the website; instead, they will be sent a security code on their mobile phones or emails, which they can enter in a form in order to sign in.</p>
                                                        <p>In addition to tangible goods and items, Letzell also sells services. With all its focus on the privacy and security of data, we moderate the listings of each item</p>
                                                        <p>We aim to provide our customers with a reliable local online marketplace so that sellers and buyers both can reap benefits. In order to fully utilize Letzell, users first need to register themselves as a seller, then list the particular item that they want for sale, and then respond accordingly to any queries or messages received from potential buyers. The encryption is such that even Letzell’s own engineers are unable to see user data</p>
                                                        <h2 className="uk-text-center">Our principles</h2>
                                                        <ul className="uk-list uk-list-bullet">
                                                            <li>We respect user privacy and so will never EVER share your information with anyone.</li>
                                                            <li>All user data is encrypted so when saved in the database , the data is in safe hands.</li>
                                                            <li>.</li>
                                                        </ul>
                                                </div>
                                                </article>
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

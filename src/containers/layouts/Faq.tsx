import React, { Component } from 'react'

interface Props {

}

export default class Faq extends Component<Props, {}> {

    render() {
        return (
            <main>
                <section className="uk-section uk-section-xsmall">
                    <div className="uk-container uk-container-xlarge">
                        <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                            <div className="uk-text-left">
                                <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                                    <li><a href="/">Home</a></li>
                                    <li><span>FAQ</span></li>
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
                                                    <li><a href="/news">News</a></li>
                                                    <li className="uk-active"><a href="/faq">FAQ</a></li>
                                                </ul>
                                            </nav>
                                        </section>
                                    </aside>
                                    <section className="uk-width-1-1 uk-width-expand@m">
                                        <article className="uk-card uk-card-default uk-card-small uk-card-body uk-article tm-ignore-container">
                                            <ul className="uk-list-divider uk-list-large" data-uk-accordion="multiple: true">
                                                <li><a className="uk-accordion-title" href="#">1. How to sell on Letzell?</a>
                                                    <div className="uk-accordion-content">
                                                        <p>Selling has been made very convenient and hassle-free for users. Once customers register or sign in, they can post advertisements on the platform and then press the Sell button. For faster selling, users can enable sponsorship of their products so that their listing gets multiple views</p>
                                                    </div>
                                                </li>
                                                <li><a className="uk-accordion-title" href="#">2. How to buy on Letzell?</a>
                                                    <div className="uk-accordion-content">
                                                        <p>Have a shopping experience of a lifetime; let Letzell be the place to fulfill your retail therapy needs. To buy effectively, firstly search for the item you need via filters present on our website. Secondly, contact the seller whose product you liked via message or set up an online meeting to discuss details about the product and conduct negotiation with respect to the pricing if required. Finally, once you are satisfied, make the payment to the seller, and after getting the product delivered to your doorstep and making sure it meets your expectations, don’t forget to share your valuable feedback with us.</p>
                                                    </div>
                                                </li>
                                                <li><a className="uk-accordion-title" href="#">3. How to leave feedback?</a>
                                                    <div className="uk-accordion-content">
                                                        <p>This feature enables us to keep track of the good and bad sellers, products, and advertisements. Buyers can share their experience with a particular seller and review them by providing a rating based on their satisfaction and, if they deem fit, give detailed feedback as well, especially about their communication, treatment they received, and quality and value for money of the product. They can press the Send Feedback button after that.</p>
                                                    </div>
                                                </li>
                                                <li><a className="uk-accordion-title" href="#">4. How to report illegal activity?</a>
                                                    <div className="uk-accordion-content">
                                                        <p>If any user encounters something fishy or suspicious on Letzell’s platform, they should immediately report it. Under the Report Abuse section, choose the reason for your suspicion and in the Description box, give details to help understand the case better.
                                                        Once we receive your complaints, our Customer Care team will process your request, and any scams or fraudulent users will be removed.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li><a className="uk-accordion-title" href="#">5. How to list an item for sale?</a>
                                                    <div className="uk-accordion-content">
                                                        <p>Once users press the Sell button, they get an option to upload photos of the item they want to sell and make sure that the category of this product is properly chosen from the given list of categories. Next, post a concise yet complete description about your product, including its pricing details and features. Then, double-check this information and press the Post Ad button. After that, await approval from Letzell’s team, who will review the advertisement and ensure that it meets all terms and conditions. Once an ad is approved, you will get notified via email at your registered email address. If in case the ad does not get approved, you will get notified regarding the edits you need to make to get it approved.</p>
                                                    </div>
                                                </li>
                                                <li><a className="uk-accordion-title" href="#">6. How to ensure protection from scams?</a>
                                                    <div className="uk-accordion-content">
                                                        <p>To ensure protection from scams, buyers should check reviews of the seller before placing an order with them. It is also advisable to meet and speak with sellers once to be assured of the item's quality. Then, after receiving the item, inspect it and pay once it meets your expectations and prevents giving out personal and financial information to unknown individuals.</p>
                                                    </div>
                                                </li>
                                            </ul>
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

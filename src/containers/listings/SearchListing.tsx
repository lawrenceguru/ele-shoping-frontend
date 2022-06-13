import * as React from 'react';

// import HeadListListings from 'containers/listings/_HeadListListings';
import ListListings from 'containers/listings/_ListListings';

interface IProps {
  match: any;
}

export default class SearchListing extends React.Component<IProps, {}> {
  public render() {
    const {
      params: { keywords }
    } = this.props.match;

    return (
      <>
        <main>
          <section className="uk-section uk-section-small">
            <div className="uk-container uk-container-xlarge">
              <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                <div className="uk-text-left">
                  <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                    <li><a href="/">Home</a></li>
                    <li><span className="uk-text-bold">{keywords}</span></li>
                  </ul>
                </div>
                <div>
                  <div className="uk-grid-medium" data-uk-grid>
                    {/* <aside className="uk-width-1-5 tm-aside-column tm-filters" id="filters" data-uk-offcanvas="overlay: true; container: false;">
                      <div className="uk-offcanvas-bar uk-padding-remove">
                        <div className="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
                          <header className="uk-card-header uk-flex uk-flex-middle">
                            <div className="uk-grid-small uk-flex-1" data-uk-grid>
                              <div className="uk-width-expand">
                                <div className="uk-h3">Filters</div>
                              </div>
                              <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                            </div>
                          </header>
                          <div className="uk-margin-remove uk-flex-1 uk-overflow-auto" data-uk-accordion="multiple: true; targets: &gt; .js-accordion-section">
                            <section className="uk-card-small uk-card-body">
                              <h4 className="uk-margin-small-bottom">Categories</h4>
                              <ul className="uk-nav uk-nav-default">
                                <li><a href="subcategory.html">Laptops</a></li>
                                <li><a href="subcategory.html">Tablets</a></li>
                                <li><a href="subcategory.html">Peripherals</a></li>
                                <li><a href="subcategory.html">Keyboards</a></li>
                                <li><a href="subcategory.html">Accessories</a></li>
                              </ul>
                            </section>
                            <section className="uk-card-body uk-open js-accordion-section">
                              <h4 className="uk-accordion-title uk-margin-remove">Distance</h4>
                              <div className="uk-accordion-content">
                                <div className="uk-grid-small uk-child-width-1-2 uk-text-small" data-uk-grid>
                                  <div>
                                    <div className="uk-inline"><span className="uk-form-icon uk-text-xsmall">ZIP</span>
                                      <input className="uk-input" type="text" placeholder="76092" />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="uk-inline"><span className="uk-form-icon uk-text-xsmall">Radius</span>
                                      <input className="uk-input" type="text" placeholder="30" />
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </section>
                            <section className="uk-card-body uk-open js-accordion-section">
                              <h4 className="uk-accordion-title uk-margin-remove">Prices</h4>
                              <div className="uk-accordion-content">
                                <div className="uk-grid-small uk-child-width-1-2 uk-text-small" data-uk-grid>
                                  <div>
                                    <div className="uk-inline"><span className="uk-form-icon uk-text-xsmall">from</span>
                                      <input className="uk-input" type="text" placeholder="$59" />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="uk-inline"><span className="uk-form-icon uk-text-xsmall">to</span>
                                      <input className="uk-input" type="text" placeholder="$6559" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section className="uk-card-body js-accordion-section uk-open">
                              <h4 className="uk-accordion-title uk-margin-remove">Brands
                              </h4>
                              <div className="uk-accordion-content">
                                <ul className="uk-list tm-scrollbox">
                                  <li>
                                    <input className="tm-checkbox" id="brand-1" name="brand" value="1" type="checkbox" />
                                    <label htmlFor="brand-1"><span>Acer
                                      <span className="uk-text-meta uk-text-xsmall">177</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-2" name="brand" value="2" type="checkbox" />
                                    <label htmlFor="brand-2"><span>Apple
                                      <span className="uk-text-meta uk-text-xsmall">18</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-3" name="brand" value="3" type="checkbox" />
                                    <label htmlFor="brand-3"><span>ASUS
                                      <span className="uk-text-meta uk-text-xsmall">150</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-4" name="brand" value="4" type="checkbox" />
                                    <label htmlFor="brand-4"><span>Dell
                                      <span className="uk-text-meta uk-text-xsmall">170</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-5" name="brand" value="5" type="checkbox" />
                                    <label htmlFor="brand-5"><span>HP
                                      <span className="uk-text-meta uk-text-xsmall">498</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-6" name="brand" value="6" type="checkbox" />
                                    <label htmlFor="brand-6"><span>MSI
                                      <span className="uk-text-meta uk-text-xsmall">54</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-7" name="brand" value="7" type="checkbox" />
                                    <label htmlFor="brand-7"><span>Samsung
                                      <span className="uk-text-meta uk-text-xsmall">1</span></span></label>
                                  </li>
                                  <li>
                                    <input className="tm-checkbox" id="brand-8" name="brand" value="8" type="checkbox" />
                                    <label htmlFor="brand-8"><span>Sony
                                      <span className="uk-text-meta uk-text-xsmall">1</span></span></label>
                                  </li>
                                </ul>
                              </div>
                            </section>
                            <div className="uk-card-body">
                              <button className="uk-button uk-button-default uk-width-1-1">
                                <span className="uk-margin-xsmall-right" data-uk-icon="icon: close; ratio: .75;"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </aside> */}
                    <div className="uk-width-expand">
                      <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                        <div>
                          <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                            <div className="uk-grid-collapse uk-child-width-1-1" id="products" data-uk-grid>
                              {/* <div className="uk-card-header">
                                <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                                  <div className="uk-width-1-1 uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-text-small"><span className="uk-margin-small-right uk-text-muted">Sort by:</span>
                                    <ul className="uk-subnav uk-margin-remove">
                                      <li className="uk-active uk-padding-remove"><a className="uk-text-lowercase" href="#">relevant<span className="uk-margin-xsmall-left" data-uk-icon="icon: chevron-down; ratio: .5;"></span></a></li>
                                      <li><a className="uk-text-lowercase" href="#">price</a></li>
                                      <li><a className="uk-text-lowercase" href="#">newest</a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div> */}
                              <div>
                                <ListListings keywords={keywords} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}

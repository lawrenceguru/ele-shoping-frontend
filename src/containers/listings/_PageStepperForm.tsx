import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SubmitField from 'components/form/SubmitField';
import { Link } from 'react-router-dom';
import { Field } from 'react-final-form';
import RenderField from 'components/form/CreateRenderField';
import { required, titleRequired, priceRequired } from 'components/form/validation';

import { Query } from 'react-apollo';

// import LISTING_OPTIONS from 'graphql/listings/listingOptionsQuery.graphql';
import LOCATION_DETAILS from 'graphql/listings/locationDetailsQuery.graphql';
import { LocationDetailsData, LocationDetailsVariables } from 'types';
import { CircularProgress } from '@mui/material';
// class ListingOptionsQuery extends Query<ListingOptionsData> { }
class LocationDetailsQuery extends Query<LocationDetailsData, LocationDetailsVariables> { }
const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];

interface IProps {
  loading: boolean;
  categoryOptions: any[];
  conditionOptions: any[];
  listing: any;
  nextStepper: any;
  location: any;
  checkLocationValidate: any;
  photoUrls: any[];
  cityAndStateCode: any;
  onRemoveImage: any;
  pageActiveStep: any;
  myForm: any;
}

interface IState {
  activeStep: number;
  skipped: any;
  desableButton: boolean;
  locationError: boolean;
}

export default class _PageStepperForm extends React.Component<IProps, IState> {
  hiddenFileInput: React.RefObject<HTMLInputElement>;
  cityName: string;
  constructor(props: IProps) {
    super(props);
    this.hiddenFileInput = React.createRef();
    this.state = {
      activeStep: 0,
      skipped: new Set<number>(),
      desableButton: false,
      locationError: true
    };
    this.cityName = '';
  }
  handleNext() {
    let nowActiveStep = this.state.activeStep;
    this.props.pageActiveStep(nowActiveStep)
    let prifixFormName = this.props.myForm.current.form;
    if (nowActiveStep === 0) {
      if (!prifixFormName.getFieldState('title').valid) {
        return;
      }
    } else if (nowActiveStep === 1) {
      if (!prifixFormName.getFieldState('description').valid) {
        return;
      }
    } else if (nowActiveStep === 2) {
      if (!prifixFormName.getFieldState('category').valid || !prifixFormName.getFieldState('condition').valid) {
        return;
      }
    } else if (nowActiveStep === 3) {
      if (!prifixFormName.getFieldState('pricePerUnit').valid) {
        return;
      }
    } else if (nowActiveStep === 4) {
      if (this.cityName === '') {
        return;
      }
    }
    this.setState({ activeStep: this.state.activeStep + 1 })
    this.setState({ skipped: 0 })
  };
  handleReset() {
    this.setState({ activeStep: 0 })
  };
  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  render() {
    const { activeStep, desableButton } = this.state;
    const { loading, categoryOptions, conditionOptions, listing, location, checkLocationValidate, photoUrls, cityAndStateCode, onRemoveImage } = this.props;
    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
          </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={() => this.handleReset()}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <div style={{ marginTop: '20px' }}>
                  <Field name="title" label="Title for your listing(*Required)" displayLabel component={RenderField} validate={titleRequired} />
                  <div>Enter item, brand, title, color etc.</div>
                </div>
              ) : activeStep === 1 ? (
                <div style={{ marginTop: '20px' }}>
                  <Field
                    name="description"
                    displayLabel
                    label="Listing Details"
                    type="textarea"
                    inputHtml={{ rows: 4 }}
                    component={RenderField}
                    validate={titleRequired}
                  />
                </div>
              ) : activeStep === 2 ? (
                <div style={{ marginTop: '20px' }}>
                  <div className="columns uk-grid">
                    <div className="column uk-width-1-2">
                      <Field
                        name="category"
                        label="Listing Details"
                        type="select"
                        displayLabel
                        options={categoryOptions}
                        component={RenderField}
                        validate={required}
                      />
                    </div>
                    <div className="column uk-width-1-2">
                      <Field name="condition"
                        label="Condition"
                        type="select"
                        displayLabel
                        options={conditionOptions}
                        component={RenderField}
                        validate={required} />
                    </div>
                  </div>
                </div>
              ) : activeStep === 3 ? (
                <div style={{ marginTop: '20px' }}>
                  <Field name="pricePerUnit"
                    type="number"
                    displayLabel
                    pattern="[0-9]*"
                    label="Price"
                    component={RenderField}
                    validate={priceRequired} />
                </div>
              ) : activeStep === 4 ? (
                <div style={{ marginTop: '20px' }}>
                  <div className="columns uk-grid">
                    <div className="column uk-width-1-3">
                      <div className="uk-margin-small">
                        <label className="label" htmlFor="Location">Location</label>
                        <div className="uk-inline uk-width-1-1">
                          <input defaultValue={location} type="text" id="Location" className="uk-input" onChange={(e) => checkLocationValidate(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    {location ?
                      <LocationDetailsQuery query={LOCATION_DETAILS} variables={{ postalCode: location }}>
                        {({ data, loading }) => {
                          if (!data.locationDetails) {
                            this.cityName = ''
                            return <div className="column uk-width-1-2">
                              <div className="uk-inline uk-width-1-1 uk-text-meta text-danger" style={{ marginTop: '30px', color: '#f0506e' }}>
                                Invalid Postal Code
                          </div>
                            </div>;
                          }
                          if (loading) return <div className="uk-flex uk-flex-center">
                            <CircularProgress color="error" />
                          </div>;
                          const { locationDetails } = data;
                          return (
                            <>
                              <div className="column uk-width-1-3">
                                <div className="uk-margin-small">
                                  <label className="label" htmlFor="city">City</label>
                                  <div className="uk-inline uk-width-1-1">
                                    <div hidden>
                                      {cityAndStateCode(locationDetails.placeName, locationDetails.stateCode)}
                                      {this.cityName = locationDetails.placeName}
                                    </div>
                                    <input value={locationDetails.placeName} type="text" id="city" className="uk-input" />
                                  </div>
                                </div>
                              </div>
                              <div className="column uk-width-1-3">
                                <div className="uk-margin-small">
                                  <label className="label" htmlFor="State">State</label>
                                  <div className="uk-inline uk-width-1-1">
                                    <input value={locationDetails.stateCode} type="text" id="State" className="uk-input" />
                                  </div>
                                </div>
                              </div>
                              <div className="column uk-width-1-3"></div>
                              <div className="column uk-width-1-3">
                                <div className="uk-margin-small">
                                  <label className="label" htmlFor="latitude">latitude</label>
                                  <div className="uk-inline uk-width-1-1">
                                    <input value={locationDetails.latitude} type="text" id="latitude" className="uk-input" />
                                  </div>
                                </div>
                              </div>
                              <div className="column uk-width-1-3">
                                <div className="uk-margin-small">
                                  <label className="label" htmlFor="latitude">longitude</label>
                                  <div className="uk-inline uk-width-1-1">
                                    <input value={locationDetails.longitude} type="text" id="longitude" className="uk-input" />
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        }}
                      </LocationDetailsQuery>
                      :
                      <div className="column uk-width-1-2">
                        <div className="uk-inline uk-width-1-1 uk-text-meta text-danger" style={{ marginTop: '30px', color: '#f0506e' }}>
                          Required location field
                      </div>
                        {this.cityName = ''}
                      </div>
                    }
                  </div>

                </div>
              ) : (
                <div className="columns">
                  <div className="column uk-margin-medium-top ">
                    <label>Add some photos</label>
                    <div className="uk-card uk-card-body uk-width-1-1">
                      {photoUrls ? (
                        <>
                          {photoUrls.length > 0 &&
                            <div style={{ margin: '15px', fontSize: '20px' }}>Uploaded photos</div>
                          }
                          <ul className="tm-slider-items uk-slider-items uk-child-width-1-6 uk-grid uk-grid-small" style={{ flexWrap: 'wrap', marginBottom: '20px' }}>
                            {photoUrls.map((_x, index) =>
                              <li key={index} style={{ marginBottom: '20px' }}>
                                <div className="tm-ratio tm-ratio-1-1">
                                  <a className="tm-media-box tm-media-box-frame" onClick={() => onRemoveImage(index)}>
                                    <figure className="tm-media-box-wrap"><img src={photoUrls[index]} alt={listing.title} />
                                    </figure>
                                    <span data-uk-icon="close"></span>
                                  </a>
                                </div>
                              </li>
                            )}
                          </ul>
                        </>
                      ) : null}
                      {photoUrls && photoUrls.length > 0 ? (
                        <Field name="image"
                          photoUrls={photoUrls}
                          label="Choose a photo..."
                          accept="image/apng, image/jpg, image/jpeg, image/png"
                          type="file" component={RenderField}
                          ref={this.hiddenFileInput}
                          style={{ display: 'none' }}
                        />
                      ) : (
                          <Field name="image"
                            photoUrls={photoUrls}
                            label="Choose a photo..."
                            accept="image/apng, image/jpg, image/jpeg, image/png"
                            type="file" component={RenderField}
                            ref={this.hiddenFileInput}
                            style={{ display: 'none' }}
                            validate={required} />
                        )}
                    </div>
                  </div>
                </div>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  className="sc-button sc-button-medium sc-button-default uk-margin-right"
                  disabled={activeStep === 0}
                  onClick={() => this.handleBack()}
                  sx={{ mr: 1 }}
                >
                  Back
            </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep !== steps.length - 1 ? (
                  <>
                    <Link className="sc-button sc-button-medium sc-button-default uk-margin-right" to="/">
                      Return
                  </Link>
                    {desableButton ?
                      <Button type='submit' disabled variant="contained" onClick={() => this.handleNext()}>Next</Button>
                      :
                      <Button type='submit' variant="contained" onClick={() => this.handleNext()}>Next</Button>
                    }
                    {/* <button type='submit' className='sc-button sc-button-medium sc-button-primary' onClick={() => this.handleNext()}>Next</button> */}
                  </>
                ) : (
                    <SubmitField loading={loading} />
                  )}
              </Box>
            </React.Fragment>
          )}
      </Box>
    );
  }

}
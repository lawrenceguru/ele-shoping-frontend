import * as React from 'react';
import { Query } from 'react-apollo';
import { Form, Field } from 'react-final-form';

import SubmitField from 'components/form/SubmitField';
import RenderField from 'components/form/RenderField';
import { required } from 'components/form/validation';
import LISTING_OPTIONS from 'graphql/listings/listingOptionsQuery.graphql';
import LOCATION_DETAILS from 'graphql/listings/locationDetailsQuery.graphql';
// import postalCodes from 'postal-codes-js';

// typings
import { ListingOptionsData, ListingForEditingFragment, LocationDetailsData, LocationDetailsVariables } from 'types';
import { CircularProgress } from '@mui/material';

class ListingOptionsQuery extends Query<ListingOptionsData> { }
class LocationDetailsQuery extends Query<LocationDetailsData, LocationDetailsVariables> { }

interface IProps {
  action: (values: any) => Promise<any>;
  initialValues: Partial<ListingForEditingFragment>;
  loading: boolean;
}

interface IState {
  removeImage: boolean;
}

export default class ListingForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { removeImage: false };
    this.submitForm = this.submitForm.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  private async submitForm(values: any) {
    const { removeImage } = this.state;
    try {
      await this.props.action({ removeImage, ...values });
    } catch (errors) {
      return errors;
    }
  }

  private onRemoveImage() {
    this.setState({ removeImage: true });
  }

  public render() {
    const { removeImage } = this.state;
    const { initialValues: listing } = this.props;

    const locationValidate = (async value => {
      if (!value) {
        return "Location is required";
      } else {
        return (
          <LocationDetailsQuery query={LOCATION_DETAILS} variables={{ postalCode: value }}>
            {({ data, loading }) => {
              console.log("inside location details query");
              if (!data) return "Invalid Postal Code";
              if (loading) return <div className="uk-flex uk-flex-center">
                <CircularProgress color="error" />
              </div>;
              const { locationDetails } = data;
              return (
                locationDetails.placeName + ", " + locationDetails.stateCode
              )
              console.log(locationDetails);
            }}
          </LocationDetailsQuery>
        )
      }
    });

    return (
      <>
      { console.log(locationValidate)}
        {/* <LocationDetailsQuery query={LOCATION_DETAILS} variables={{ postalCode: "76092" }}>
        {({ data, loading }) => {
          console.log("inside location details query");
          if (!data) return null;
          if (loading) return <div className="uk-flex uk-flex-center">
            <CircularProgress color="error" />
          </div>;
          console.log(data);
          const { locationDetails } = data;
          return (
            <div>{locationDetails.placeName}, {locationDetails.stateCode}</div>
          )

          console.log(locationDetails);
        }}
      </LocationDetailsQuery> */}

        <ListingOptionsQuery query={LISTING_OPTIONS}>
          {({ data, loading }) => {
            if (!data) return null;
            if (loading) return <div className="uk-flex uk-flex-center">
              <CircularProgress color="error" />
            </div>;
            const { categoryOptions, conditionOptions } = data;
            return (
              <Form
                onSubmit={this.submitForm}
                initialValues={listing}
                render={({ handleSubmit }: any) => (
                  <form onSubmit={handleSubmit} className="uk-grid-medium">
                    <Field name="title" label="Title" displayLabel component={RenderField} validate={required} />
                    <div className="columns uk-grid">
                      <div className="column uk-width-1-2">
                        <Field
                          name="category"
                          label="Category"
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
                    <div className="columns uk-grid">
                      {/* <div className="column uk-width-1-3">
                      <Field name="noOfUnits"
                        type="number"
                        displayLabel
                        pattern="[0-9]*"
                        label="No of Units"
                        component={RenderField}
                        validate={required} />
                    </div> */}
                      <div className="column uk-width-1-6">
                        <Field name="pricePerUnit"
                          type="number"
                          displayLabel
                          pattern="[0-9]*"
                          label="Price"
                          component={RenderField}
                          validate={required} />
                      </div>
                      
                      <div className="column uk-width-1-4">
                        <Field name="location"
                          displayLabel
                          label="Location"
                          component={RenderField}
                          validate={required} />
                      </div>
                      <div className="column uk-width-1-3">
                        <Field name="city"
                          displayLabel
                          label="City"
                          component={RenderField}
                           />
                      </div>
                      <div className="column uk-width-1-4">
                        <Field name="state"
                          displayLabel
                          label="State"
                          component={RenderField}
                           />
                      </div>
                      {listing.location}
                    </div>
                    <div className="columns">
                      <div className="column uk-margin-medium-top ">
                        <label>Add some photos</label>
                        <div className="uk-card uk-card-body uk-width-1-1">
                          {listing.photoUrls && !removeImage ? (
                            <>
                              <ul className="tm-slider-items uk-slider-items uk-child-width-1-6 uk-grid uk-grid-small">
                                {listing.photoUrls.map((_x, y) =>
                                  <li key={y}>
                                    <div className="tm-ratio tm-ratio-1-1">
                                      <a className="tm-media-box tm-media-box-frame" onClick={this.onRemoveImage}>
                                        <figure className="tm-media-box-wrap"><img src={listing.photoUrls[y]} alt={listing.title} />
                                        </figure>
                                        <span data-uk-icon="close"></span>
                                      </a>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </>

                          ) : null}
                          <Field name="image"
                            label="Choose a photo..."
                            accept="image/apng, image/jpg, image/jpeg, image/png"
                            type="file" component={RenderField}
                            />
                        </div>
                      </div>
                    </div>
                    <Field
                      name="description"
                      displayLabel
                      label="Listing Details"
                      type="textarea"
                      inputHtml={{ rows: 4 }}
                      component={RenderField}
                      validate={required}
                    />

                    <SubmitField loading={loading} />
                  </form>
                )}
              />
            );
          }}
        </ListingOptionsQuery>
      </>
    );
  }
}

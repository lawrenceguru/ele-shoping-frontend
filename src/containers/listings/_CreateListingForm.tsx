import * as React from 'react';
import { Query } from 'react-apollo';
import { Form } from 'react-final-form';

import LISTING_OPTIONS from 'graphql/listings/listingOptionsQuery.graphql';
// import postalCodes from 'postal-codes-js';
import PageStepperForm from './_PageStepperForm';

// typings
import { ListingOptionsData, ListingForEditingFragment } from 'types';
import { CircularProgress } from '@mui/material';

class ListingOptionsQuery extends Query<ListingOptionsData> { }

interface IProps {
  action: (values: any) => Promise<any>;
  initialValues: Partial<ListingForEditingFragment>;
  loading: boolean;
}

interface IState {
  removeImage: boolean;
  nextStepper: boolean;
  location: string;
  photoUrls: any;
}


export default class ListingForm extends React.Component<IProps, IState> {
  myForm: React.RefObject<HTMLInputElement>;
  city: string;
  stateCode: string;
  activeStep: number;
  constructor(props: IProps) {
    super(props);
    this.myForm = React.createRef();
    this.state = {
      removeImage: false,
      nextStepper: false,
      location: '',
      photoUrls: []
    };
    this.submitForm = this.submitForm.bind(this);
    this.city = '';
    this.stateCode = '';
    this.activeStep = 0;
  }

  private async submitForm(values: any) {
    const { removeImage } = this.state;
    values.location = this.state.location
    values.city = this.city
    values.stateCode = this.stateCode
    values.photoUrls = this.state.photoUrls
    console.log('submit => ', values)
    // console.log('submit => ', values.image.length)
    if (this.activeStep >= 4) {
      try {
        await this.props.action({ removeImage, ...values });
      } catch (errors) {
        return errors;
      }
    }
  }
  // private onRemoveImage() {
  //   this.setState({ removeImage: true });
  // }
  
 
  componentWillMount() {
    const { initialValues: listing } = this.props;
    this.setState({location: listing.location})
    this.setState({photoUrls: listing.photoUrls})
  }

  public render() {
    const { location, photoUrls } = this.state;
   
    const checkLocationValidate = (_locationValue) => {
      this.setState({location: _locationValue})
    }
    const onRemoveImage = (index: number) => {
      // this.setState({ removeImage: true });
      this.setState({photoUrls: this.state.photoUrls.filter((_, i) => index !== i)})
    }
    const cityAndStateCodeSet = (val1: string, val2: string) => {
      this.city = val1;
      this.stateCode = val2;
    }
    const pageActiveStep = (val) => {
      this.activeStep = val
    }
    const { nextStepper } = this.state;
    const { initialValues: listing } = this.props;
    return (
      <ListingOptionsQuery query={LISTING_OPTIONS}>
        {({ data, loading }) => {
          if (!data) return null;
          if (loading) return <div className="uk-flex uk-flex-center">
            <CircularProgress color="error" />
          </div>;
          const { categoryOptions, conditionOptions } = data;
          return (
            <Form
              name='useForm'
              onSubmit={this.submitForm}
              initialValues={listing}
              ref={this.myForm}
              render={({ handleSubmit }: any) => (
                <form onSubmit={handleSubmit} className="uk-grid-medium">
                  <PageStepperForm
                    loading={loading}
                    categoryOptions={categoryOptions}
                    conditionOptions={conditionOptions}
                    listing={listing}
                    nextStepper={nextStepper}
                    pageActiveStep={pageActiveStep}
                    location={location}
                    checkLocationValidate={checkLocationValidate}
                    photoUrls={photoUrls}
                    cityAndStateCode={cityAndStateCodeSet}
                    onRemoveImage={onRemoveImage}
                    myForm={this.myForm}
                  />
                </form>
              )}
            />
          );
        }}
      </ListingOptionsQuery>
    );
  }
}

import * as React from 'react';
import classnames from 'classnames';
import capitalize from 'utils/stringUtils';
import Compressor from 'compressorjs';
import Button from '@mui/material/Button';

// typings
import { IFormInput, IMeta, IOption } from 'components/form/renderField.d';

interface IProps {
  input: IFormInput;
  meta: IMeta;
  type: string;
  inputHtml?: any;
  options?: Array<IOption>;
  className?: string;
  displayLabel?: boolean;
  label?: string;
  hint?: string;
  name: string;
  photoUrls: any;
}

interface IState {
  label: string;
  selectedFiles: any[];
}

export default class RenderField extends React.Component<IProps, IState> {
  public static defaultProps = {
    type: 'text',
    label: '',
    displayLabel: false,
    options: [],
    inputHtml: {
      className: ''
    }
  };
  handler: any;
  myRef: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    const { label, input: { name } } = this.props;
    this.state = { label: label || capitalize(name), selectedFiles: [] };
    this.input = this.input.bind(this);
    this.stateClass = this.stateClass.bind(this);
    this.defaultWrapper = this.defaultWrapper.bind(this);
    this.checkboxWrapper = this.checkboxWrapper.bind(this);
    this.fileWrapper = this.fileWrapper.bind(this);
    this.handler = null
    this.myRef = React.createRef();
  }

  private input(type: string, input: IFormInput, inputHtml: any, selectOptions?: Array<IOption>): JSX.Element {
    let inputClass = classnames(inputHtml.className, this.stateClass());
    const { selectedFiles } = this.state
    switch (type) {
      case 'textarea':
        inputClass = classnames('uk-textarea', inputClass);
        return <textarea id={input.name} {...input} {...inputHtml} className={inputClass} />;
      case 'file':
        const { onChange, onBlur, value, ...fileInput } = input;
        const onFileChange = (handler: any) => ({ target: { files } }: any) => {
          this.handler = handler;
          const images = [];
          for (let index = 0; index < files.length; index++) {
            new Compressor(files[index], {
              quality: 0.2,
              success(result) {
                images.push(result)
              },
              error(err) {
                console.log(err.message);
              },
            })
          }
          console.log(this.state.selectedFiles)
          if (this.state.selectedFiles.length + Array.from(files).length  + (this.props.photoUrls?.length || 0) < 11) {
            this.setState({ selectedFiles: [...selectedFiles, ...Array.from(files)] }, () => {
              handler(files.length ? this.state.selectedFiles : null);
            })
          } else {
            window.alert('Error: You can upload up to 10 files.')
          }
        };
        const removeUploadImage = (e, index) => {
          e.preventDefault()
          selectedFiles.splice(index, 1)
          if (this.handler) {
            this.setState({ selectedFiles }, () => {
              this.handler(this.state.selectedFiles.length ? this.state.selectedFiles : null);
            })
          }
        }
        const renderImage = (image: Blob) => {
          try {
            return (
              <img src={URL.createObjectURL(image)} alt='not fount' />
            )
          } catch (err) {
            return null
          }
        }
        return (
          <>
            {selectedFiles && (
              <>
                {selectedFiles.length > 0 && this.props.photoUrls?.length > 0 && (
                  <div style={{margin: '15px', fontSize: '20px'}}>New photos</div>
                )}
                <ul className="tm-slider-items uk-slider-items uk-child-width-1-6 uk-grid uk-grid-small" style={{flexWrap: 'wrap', marginBottom: '20px'}}>
                  {selectedFiles.map((_, index) =>
                    selectedFiles[index] ? <li key={index} style={{marginBottom: '20px'}}>
                      <div className="tm-ratio tm-ratio-1-1">
                        <a className="tm-media-box tm-media-box-frame" onClick={(e) => removeUploadImage(e, index)}>
                          <figure className="tm-media-box-wrap">
                            {renderImage(selectedFiles[index])}
                          </figure>
                          <span data-uk-icon="close"></span>
                          {selectedFiles[index].name && selectedFiles[index].name.length > 10 ?
                            <div style={{ fontSize: '12px' }}>{selectedFiles[index].name.slice(0, 5)} ... {selectedFiles[index].name.slice(selectedFiles[index].name.length - 5)}</div>
                            :
                            <div style={{ fontSize: '12px' }}>{selectedFiles[index].name}</div>
                          }
                        </a>
                      </div>
                    </li> : null
                  )}
                </ul>
              </>
            )}
            {/* {selectedFiles && (
              <div>
                {selectedFiles.map((_, index) =>
                  selectedFiles[index] ?
                    <div className="tm-ratio tm-ratio-1-1">
                      <a className="tm-media-box tm-media-box-frame" onClick={(e) => removeUploadImage(e, index)}>
                        <figure className="tm-media-box-wrap">
                          {renderImage(selectedFiles[index])}
                        </figure>
                        <span data-uk-icon="close"></span>
                        {selectedFiles[index].name && selectedFiles[index].name.length > 10 ?
                          <div style={{ fontSize: '12px' }}>{selectedFiles[index].name.slice(0, 5)} ... {selectedFiles[index].name.slice(selectedFiles[index].name.length - 5)}</div>
                          :
                          <div style={{ fontSize: '12px' }}>{selectedFiles[index].name}</div>
                        }
                      </a>
                    </div>
                  : null
                )}
              </div>
            )} */}
            <div>
              <label htmlFor={input.name}>
                <Button
                  onClick={() => this.myRef.current.click()}
                  className="sc-button sc-button-medium"
                >
                  Upload files
                </Button>
              </label>
              {selectedFiles.length > 0 || this.props.photoUrls?.length > 0?
                <span className='uk-margin-left'>{selectedFiles?.length + (this.props.photoUrls?.length || 0) } files</span>
                :
                <span className='uk-margin-left'>Choose image files</span>
              }
            </div>
            <div id="upload-drop" className="uk-placeholder" hidden>
              <a className="uk-form-file">
                <input
                  type="file"
                  multiple
                  id={input.name}
                  {...fileInput}
                  {...inputHtml}
                  ref={this.myRef}
                  onChange={onFileChange(onChange)}
                  //   onBlur={onFileChange(onBlur)}
                  className={inputClass}
                  accept="image/*"
                />
              </a>
            </div>
          </>


        );
      case 'checkbox':
        return <input type="checkbox" id={input.name} {...input} {...inputHtml} className={inputClass} />;
      case 'number':
        inputClass = classnames('uk-input', inputClass);
        return <input type="number" min="1" max="99999" id={input.name} {...input} {...inputHtml} className={inputClass} />;
      case 'select':
        inputClass = classnames('uk-select', inputClass);
        return (
          <select id={input.name} {...input} {...inputHtml} className={inputClass}>
            {selectOptions!.map(option => (
              <option key={option.group + option.value} value={option.value}>
                {
                  (option.group) ? option.group + " - " + option.label : option.label
                }

              </option>
            ))}
          </select>
        );
      default:
        inputClass = classnames('uk-input', inputClass);
        return <input type={type} id={input.name} {...input} {...inputHtml} maxLength="200" className={inputClass} />;
    }
  }

  private defaultWrapper(
    type: string,
    displayLabel: boolean,
    input: IFormInput,
    inputHtml: any,
    selectOptions?: Array<IOption>
  ): React.ReactNode {
    return [
      (displayLabel ? <label key="label" className="label" htmlFor={input.name}>
        {this.state.label}
      </label> : null),
      // <label key="label" className="label" htmlFor={input.name}>
      //   {this.state.label}
      // </label>,
      <div key="control" className="uk-inline uk-width-1-1">
        {this.input(type, input, inputHtml, selectOptions)}
      </div>
    ];
  }

  private checkboxWrapper(type: string, input: IFormInput, inputHtml: any): React.ReactNode {
    return (
      <div className="uk-control">
        <label className="uk-checkbox" htmlFor={input.name}>
          {this.input(type, input, inputHtml)}
          {this.state.label}
        </label>
      </div>
    );
  }

  private fileWrapper(type: string, input: IFormInput, inputHtml: any) {
    const value = input.value;
    const filename = value && value.name;
    const newInputHtml = { ...inputHtml, className: classnames(inputHtml.className, 'file-input') };

    return (
      <div className="uk-file">
        <label className="file-label is-medium">
          {this.input(type, input, newInputHtml)}
          {filename ? <span className="file-name">{filename} </span> : null}
        </label>
      </div>
    );
  }

  public render() {
    const { type, meta, className, hint, input, displayLabel, inputHtml, options: selectOptions } = this.props;

    let wrapper: React.ReactNode = null;
    switch (type) {
      case 'checkbox':
        wrapper = this.checkboxWrapper(type, input, inputHtml);
        break;
      case 'file':
        wrapper = this.fileWrapper(type, input, inputHtml);
        break;
      default:
        wrapper = this.defaultWrapper(type, displayLabel, input, inputHtml, selectOptions);
    }

    return (
      <div className={classnames('uk-margin-small', className)}>
        {wrapper}
        {(meta.error || meta.submitError) &&
          meta.touched && <p className="uk-margin-remove uk-text-meta uk-text-danger">{meta.error || meta.submitError}</p>}
        {hint && <p className="uk-text-meta">{hint}</p>}
      </div>
    );
  }

  private stateClass() {
    const { meta } = this.props;
    return { 'uk-danger': meta.touched && meta.invalid };
  }
}

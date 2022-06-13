import * as React from 'react';
import classnames from 'classnames';
import capitalize from 'utils/stringUtils';
import Compressor from 'compressorjs';

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
}

interface IState {
  label: string;
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

  constructor(props: IProps) {
    super(props);
    const { label, input: { name } } = this.props;
    this.state = { label: label || capitalize(name) };
    this.input = this.input.bind(this);
    this.stateClass = this.stateClass.bind(this);
    this.defaultWrapper = this.defaultWrapper.bind(this);
    this.checkboxWrapper = this.checkboxWrapper.bind(this);
    this.fileWrapper = this.fileWrapper.bind(this);
  }

  private input(type: string, input: IFormInput, inputHtml: any, selectOptions?: Array<IOption>): JSX.Element {
    let inputClass = classnames(inputHtml.className, this.stateClass());

    switch (type) {
      case 'textarea':
        inputClass = classnames('uk-textarea', inputClass);
        return <textarea id={input.name} {...input} {...inputHtml} className={inputClass} />;
      case 'file':
        const { onChange, onBlur, value, ...fileInput } = input;
        const onFileChange = (handler: any) => ({ target: { files } }: any) => {
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

          handler(files.length ? Array.from(files) : null);
        };
        return (
          <>         
            <div id="upload-drop" className="uk-placeholder">
              <a className="uk-form-file">
                <input
                  type="file"
                  multiple
                  id={input.name}
                  {...fileInput}
                  {...inputHtml}
                  onChange={onFileChange(onChange)}
                  onBlur={onFileChange(onBlur)}
                  className={inputClass}
                />
              </a>.
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
      ( displayLabel ? <label key="label" className="label" htmlFor={input.name}>
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

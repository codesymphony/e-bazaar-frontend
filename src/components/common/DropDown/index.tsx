/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SimpleBar from 'simplebar-react';

import { Input, Label, InputWrapper, ErrorMesssage } from '../styled';

import { DropDownWrapper, OptionsWrapper, Option } from './styles';

import useClickOutside from '@components/custom-hooks/useClickOutside';

interface DropDownProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  options: string[];
  error: string;
  defaultValue: string;
  onChange(value: string): void;
}

const DropDown: React.FC<DropDownProps> = props => {
  const { options, onChange, error, defaultValue, ...inputProps } = props;
  const [input, setInput] = React.useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);

  const closeOptions = React.useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  const clickOutsideRef = useClickOutside(closeOptions);

  const selectOption = React.useCallback(
    (value: string) => {
      setInput(value);
      setShow(false);
      onChange(value);
    },
    [onChange],
  );

  return (
    <DropDownWrapper>
      <InputWrapper>
        <Input
          {...(inputProps as any)}
          value={input || defaultValue}
          onClick={() => setShow(prev => !prev)}
        />
        {error ? (
          <ErrorMesssage>{error}</ErrorMesssage>
        ) : (
          <Label htmlFor={inputProps.name} className="input-label">
            {inputProps.label}
          </Label>
        )}
      </InputWrapper>
      <OptionsWrapper show={show} ref={clickOutsideRef}>
        <SimpleBar style={{ height: '200px' }} autoHide={false}>
          {options.map(option => (
            <Option onClick={() => selectOption(option)}>{option}</Option>
          ))}
        </SimpleBar>
      </OptionsWrapper>
    </DropDownWrapper>
  );
};

export default DropDown;

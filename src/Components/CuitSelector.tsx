import React, { Component } from 'react';

import Creatable from 'react-select/creatable';

type State = {
  options: Array<{ label: string, value: string }>,
  value: string | void,
  isLoading: boolean,
};


const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createOption('20319823973'),
  createOption('20133940112'),
];

export default class CuitSelector extends Component<{onChange: any}, State> {
  state = {
    isLoading: false,
    options: defaultOptions,
    value: undefined,
  };

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue });
    this.props.onChange && this.props.onChange({newValue, actionMeta});
  };

  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true });
    console.group('Option created');
    console.log('Wait a moment...');
    setTimeout(() => {
      const { options } = this.state;
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();
      this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: inputValue,
      });
    }, 1000);
  };
  render() {
    const { isLoading, options, value } = this.state;
    return (
      <Creatable
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        value={value}
        isMulti
        placeholder="Ingrese una lista de CUITs"
      />
    );
  }
}
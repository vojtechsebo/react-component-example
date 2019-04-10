import React, { Component } from 'react';
import PropType from 'prop-types';
import { Tag, AutoComplete } from 'antd';

/**
 * @class TagsWidget
 * @extends {Component}
 * @author Vojtech Sebo
 */
class TagsWidget extends Component {
  state = {
    value: '',
    tags: this.props.tags ? this.props.tags : []
  };

  componentWillReceiveProps = nextProps => this.setState({ tags: nextProps.tags });

  /**
   * Handler for select
   * @param {string} value
   */
  onSelect = value => {
    const { tags } = this.state;
    const { data, onSelectHandler } = this.props;

    for (let key in data) {
      if (value === data[key] && !tags.includes(key)) {
        onSelectHandler(tags.concat(key));
      }
    }
  };

  render() {
    const { value, tags } = this.state;
    const { data, onSelectHandler } = this.props;
    const dataValues = Array.from(Object.values(data));

    const Tags = tags.map((id, index) => (
      <Tag key={id} closable afterClose={() => onSelectHandler(tags.filter(item => id !== item))}>
        {data[parseInt(id, 10)]}
      </Tag>
    ));

    return (
      <div className="tags-widget">
        <AutoComplete
          value={value}
          dataSource={dataValues}
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={this.onSelect}
        />
        <div>{Tags}</div>
      </div>
    );
  }
}

TagsWidget.propTypes = {
  data: PropType.object,
  default: PropType.object,
  onSelectHandler: PropType.func
};

export default TagsWidget;

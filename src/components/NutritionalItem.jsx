import React from 'react';
import PropTypes from 'prop-types';

function NutritionalItem({
  backgroundColor, title, amount, measurement,
}) {
  return (
    <div className="flex w-full justify-between items-center my-1">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor }} />
        <span className={`ml-3 text-gray-700 capitalize ${backgroundColor !== '#FFF' ? 'font-bold' : 'font-normal'}`}>{title}</span>
      </div>
      <span className={backgroundColor !== '#FFF' ? 'font-medium' : 'font-normal'}>
        {amount.toFixed(2) + measurement}
      </span>
    </div>
  );
}

NutritionalItem.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.func.isRequired,
  amount: PropTypes.func.isRequired,
  measurement: PropTypes.func.isRequired,
};

NutritionalItem.defaultProps = {
  backgroundColor: '#FFF',
};

export default NutritionalItem;

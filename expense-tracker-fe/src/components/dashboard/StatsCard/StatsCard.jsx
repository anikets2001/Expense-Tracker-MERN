import React from "react"
import PropTypes from 'prop-types'

const StatsCard = ({ title, value, footer }) => {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
      <div className="mt-2 text-sm">{footer}</div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  footer: PropTypes.node
}

export default StatsCard
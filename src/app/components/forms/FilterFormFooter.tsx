import React from "react";

interface Props {
  resetFilter: () => void;
}

const FilterFormFooter: React.FC<Props> = ({ resetFilter }) => {
  return (
    <div className="d-flex justify-content-end mt-6">
      <button type="reset" className="btn btn-secondary btn-sm me-2" onClick={resetFilter}>Reset
      </button>

      <button type="submit" className="btn btn-sm btn-primary">Filter</button>
    </div>
  );
};

export default FilterFormFooter;
import React from 'react';

interface Props {
    resetFilter: () => void
}

const FilterFormFooter: React.FC<Props> = ({resetFilter}) => {
    return (
        <div className="d-flex justify-content-end mt-6">
            <button type='reset' className='btn btn-secondary btn-sm me-2'
                    ref={(el) => {
                        if (el) {
                            el.style.setProperty('background-color', '#e1e3ea', 'important');
                        }
                    }} onClick={resetFilter}>Reset
            </button>

            <button type='submit' className='btn btn-sm btn-primary'
                    ref={(el) => {
                        if (el) {
                            el.style.setProperty('background-color', '#009ef7', 'important');
                        }
                    }}>Filter
            </button>
        </div>
    )
}

export default FilterFormFooter;
import { customStyles } from '@/Pages/Dashboard/AdminDashboard/AddDoctor/customStyle';
import { Select } from '@radix-ui/react-select';
import React from 'react';

const CustomSelect = ({id,name,onChange,value,options}) => {
    return (
        <div className="form-control mb-4 space-y-3 ">
                      
                      <Select
                        id={id}
                        name={name}
                        onChange={onChange}
                        value={value}
                        options={options}
                        className="full    "
                        styles={customStyles}
                      />
                      
                    </div>
    );
};

export default CustomSelect;
import React from 'react';
import { LuShieldCheck } from 'react-icons/lu';

const BannerFooter = ({text}) => {
    return (
        <div className="mb-2 flex gap-1 items-center" > <span className="text-blue-500"><LuShieldCheck style={{ height: '18px', width: '18px' }} /></span>{text}</div>
    );
};

export default BannerFooter;

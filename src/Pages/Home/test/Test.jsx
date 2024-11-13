import React from 'react';

const Test = () => {
    return (
        <div>
            <div className="flex h-44 flex-col md:flex-row lg:flex-row">

  <div className="order-1 md:order-1 lg:order-2 md:w-1/2 lg:w-1/3 bg-red-300 p-4">
logo
  </div>

  
  <div className="order-2 md:order-2 lg:order-1 md:w-1/2 lg:w-1/3 flex flex-col bg-blue-300 p-4">
<span>home</span> <span className='hidden md:block lg:hidden'>social</span>
  </div>


  <div className="order-3 md:hidden lg:block md:order-3 lg:order-3 lg:w-1/3 bg-green-300 p-4">
   social

  </div>
</div>
        </div>
    );
};

export default Test;
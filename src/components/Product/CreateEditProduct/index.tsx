import React from 'react';

import ReactCalendar from '@components/common/React-Calendar';

const CreateEditProduct: React.FC = () => {
  return (
    <>
      <div>Product</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ReactCalendar
          onDateChange={timestamp => {
            console.log(timestamp);
          }}
        />
      </div>
    </>
  );
};

export default CreateEditProduct;

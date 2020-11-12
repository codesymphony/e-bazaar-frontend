import React from 'react';
import { Button } from 'rsuite';

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
        <Button>Click!</Button>
      </div>
    </>
  );
};

export default CreateEditProduct;

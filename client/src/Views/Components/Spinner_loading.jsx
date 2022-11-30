import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

export default function SpinnerLoading() {
  return (
    <>
        <MDBSpinner role='status' className='mx-2' color='info'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </>
  );
}
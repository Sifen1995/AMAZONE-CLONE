import React from 'react';
import {CircleLoader} from 'react-spinners'

export default function Loader() {
  return (
    <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"50vh",
    }

    }>
      <CircleLoader color="#d49644"/>
    </div>
  )
}

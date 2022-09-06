import React from 'react'
import GenericReportComponent from '../Components/genericReport';

function GenericReport(props) {
    let data = props.location.aboutProps;
  return (
<GenericReportComponent items={data.items} type={data.type} title={data.title} producer={data.producer}/>
  )
}

export default GenericReport
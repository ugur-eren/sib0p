import React from 'react'
import Types from '../../Includes/Types/Types'

export default (props: {navigation: Types.Navigation}) => {

    props.navigation.goBack()
    props.navigation.navigate("Share")
    return (<></>)
}
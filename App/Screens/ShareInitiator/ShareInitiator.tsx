import React, { useEffect } from 'react'
import Types from '../../Includes/Types/Types'

export default (props: { navigation: Types.Navigation }) => {
    props.navigation.goBack()
    props.navigation.navigate('Share')
    
	useEffect(() => {
		const focusListener = props.navigation.addListener('didFocus', () => {
            props.navigation.goBack()
            props.navigation.navigate('Share')
        })
        
        return () => {
            if (focusListener) focusListener.remove()
        }
	})

	return <></>
}

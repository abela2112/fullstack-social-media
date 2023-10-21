import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import FlexBetween from 'components/flexBetween'
import WidgetWrapper from 'components/widgetWrapper'
import React from 'react'

const AdvertiseWidget = () => {
    const { palette } = useTheme()
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    const dark = palette.neutral.dark
    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant='h5' fontWeight={'500'}>sponserd</Typography>
                <Typography color={medium}>create AD</Typography>
            </FlexBetween>
            <img
                width='100%'
                height='auto'
                alt='advert'
                style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
                src={`${process.env.REACT_APP_BASE_URL}assets/library.png`}

            />
            <FlexBetween>
                <Typography color={main}>mikkaBooks</Typography>
                <Typography color={medium}>mikka.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertiseWidget
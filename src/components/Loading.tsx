import { CircularProgress } from '@mui/material'
import React, { ReactElement } from 'react'

interface Props {

}

export default function Loading({ }: Props): ReactElement {
    return (
            <CircularProgress color="primary" />
    )
}

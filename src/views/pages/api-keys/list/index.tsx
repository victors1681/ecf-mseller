'use client'

// MUI Imports

import Grid from '@mui/material/Grid'

import ApiKeyTable from './ApiKeyListTable'

// Component Imports

const OrderList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ApiKeyTable />
      </Grid>
    </Grid>
  )
}

export default OrderList

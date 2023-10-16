import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import build from 'next/dist/build'

const apiUrl = 'https://api.coincap.io/v2/assets?'

export const cryptoApi = createApi({
    reducerPath: 'api/cryptos',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: build => ({
        getCryptos: build.query({ query: (limit = 200) => `limit=${limit}` })
    })
})

export const { useGetCryptosQuery } = cryptoApi
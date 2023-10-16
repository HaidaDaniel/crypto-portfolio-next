'use client'

import { Container, Typography, Link, Grid, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import CryptoPriceChart from '../../../components/CryptoPriceChart';

const CryptoDetails = () => {
    const [crypto, setCrypto] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = 'dc3c754a-8e83-4879-82dc-2aaa1ce6d802';
                const apiUrl = `https://api.coincap.io/v2/assets/${id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                });

                const rawData = response.data.data;
                console.log(rawData)
                const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
                const roundToNDecimalPlaces = (value, n) => {
                    if (isNumber(value)) {
                        return parseFloat(value).toFixed(n);
                    }
                    return value;
                };

                const filteredAndRoundedData = {
                    ...rawData,
                    supply: roundToNDecimalPlaces(rawData.supply, 4),
                    maxSupply: roundToNDecimalPlaces(rawData.maxSupply, 4),
                    marketCapUsd: roundToNDecimalPlaces(rawData.marketCapUsd, 4),
                    volumeUsd24Hr: roundToNDecimalPlaces(rawData.volumeUsd24Hr, 4),
                    priceUsd: roundToNDecimalPlaces(rawData.priceUsd, 4),
                    vwap24Hr: roundToNDecimalPlaces(rawData.vwap24Hr, 4),
                };

                setCrypto(filteredAndRoundedData);
            } catch (error) {
                console.error('Error in downloading data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (!crypto) {
        return <Typography variant='h4'>Crypto not found</Typography>;
    }

    return (
        <Container>
            <Typography variant='h4'>{crypto.name}</Typography>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <CryptoPriceChart cryptoId={crypto.id} />
                <Grid container spacing={3} marginTop={'0.5rem'}>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>Supply:</Typography>
                        <Typography>{crypto.supply}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>Max Supply:</Typography>
                        <Typography>
                            {crypto.maxSupply !== null ? crypto.maxSupply : '\u221E'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>Market Cap (USD):</Typography>
                        <Typography>${crypto.marketCapUsd}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>24Hr Volume (USD):</Typography>
                        <Typography>${crypto.volumeUsd24Hr}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>Price (USD):</Typography>
                        <Typography>${crypto.priceUsd}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>Change (24Hr):</Typography>
                        <Typography>{crypto.changePercent24Hr}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>VWAP (24Hr):</Typography>
                        <Typography>${crypto.vwap24Hr}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>Explorer:</Typography>
                        <Link
                            href={crypto.explorer}
                            target='_blank'
                            rel='noopener noreferrer'>
                            {crypto.explorer}
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CryptoDetails;
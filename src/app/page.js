'use client'
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchCryptoData } from '@/api';
import styles from './page.module.css';
import { columns, cellStyles } from '../components/gridProperties/mainGrid';
import { getFavorites, addToFavorites, removeFromFavorites } from '@/components/helpers/favorite';

export default function Home() {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const arrayFavs = getFavorites();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleFavorite = async (crypto_id) => {
    try {
      if (arrayFavs?.includes(crypto_id)) {
        removeFromFavorites(crypto_id);
        console.log(`Removed to favorites: ${crypto_id}`);
      } else {
        addToFavorites(crypto_id);
        console.log(`Added to favorites: ${crypto_id}`);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error in download data: {error.message}</div>;
  }
  const rows = cryptoData
  return (
    <main className={styles.main}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.name}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Toolbar />
      </Paper>
    </main>
  );
}
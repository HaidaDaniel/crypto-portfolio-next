/** @format */

'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { TableCell, TableRow } from '@mui/material'
import FavButton from './FavButtons'

const MainTableBody = ({ rows }) => {
  const [favorites, setFavorites] = useState(['bitcoin'])

  const toggleFavorite = async (crypto_id) => {
    try {
      console.log(crypto_id)
      if (favorites?.includes(crypto_id)) {
        setFavorites(favorites.filter((el) => el !== crypto_id))
        console.log(`Removed from favorites: ${crypto_id}`)
      } else {
        setFavorites((prevFavorites) => [...prevFavorites, crypto_id])
      }
    } catch (error) {
      console.error('Error adding to favorites:', error)
    }
  }
  useEffect(() => {
    // const localFavorites = getFavorites()
    // setFavorites(localFavorites)
    console.log(favorites)
  }, [favorites])

  return (
    <>
      {rows?.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align='right'>{row.rank}</TableCell>
          <TableCell component='th' scope='row'>
            {row.name}
          </TableCell>
          <TableCell align='right'>{row.priceUsd}</TableCell>
          <TableCell align='right'>{row.volumeUsd24Hr}</TableCell>
          <TableCell align='right'>{row.marketCapUsd}</TableCell>
          <TableCell align='right'>
            {favorites && (
              <FavButton
                toggleFavorite={toggleFavorite}
                isInFav={favorites.includes(row.id)}
                id={row.id}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default MainTableBody

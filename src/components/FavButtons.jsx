/** @format */
'use client'
import { Button } from '@mui/material'

const FavButton = ({ id, isInFav, toggleFavorite }) => {
  const crypto_id = id
  return (
    <>
      <Button onClick={() => toggleFavorite(crypto_id)}>
        {isInFav ? 'Remove' : 'Add'}
      </Button>
    </>
  )
}
export default FavButton

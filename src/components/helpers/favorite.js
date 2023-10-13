
'use client'
export const addToFavorites = (crypto_id) => {
    const favorites = getFavorites();
    if (!favorites.includes(crypto_id)) {
        favorites.push(crypto_id);
        saveFavorites(favorites);
    }
};

export const removeFromFavorites = (crypto_id) => {
    const favorites = getFavorites();
    const index = favorites.indexOf(crypto_id);
    if (index !== -1) {
        favorites.splice(index, 1);
        saveFavorites(favorites);
    }
};

export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
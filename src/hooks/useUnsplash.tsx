import { useEffect, useState } from 'react';

export const useUnsplash = () => {

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Unsplash APIからランダムな画像を取得する
    fetch('https://api.unsplash.com/photos/random?client_id=pD9Rp4p_thSfcj7czFnZcdWFf_4sY8iZWqOD1r-atZw')
      .then(response => response.json())
      .then(data => {
        // APIから取得した画像のURLをセットする
        setImageUrl(data.urls.regular);
      })
      .catch(error => {
        console.error('Error fetching random image:', error);
      });
  }, []);

  return { imageUrl, setImageUrl }
}
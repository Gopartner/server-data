const axios = require('axios');

const baseUrl = 'https://raw.githubusercontent.com/Gopartner/server-data/Master/data%20json';

// Fungsi untuk mengambil data dari file JSON
async function fetchData() {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// Fungsi untuk menambahkan data makanan baru
async function addNewFood(newFood) {
  try {
    // Mengambil data yang ada
    const data = await fetchData();
    if (!data) {
      throw new Error('Data not available');
    }

    // Menambahkan data makanan baru
    const newId = generateUniqueId(); // Fungsi untuk menghasilkan ID unik
    const foodToAdd = { id: newId, ...newFood };
    data.makanan.push(foodToAdd);

    // Menyimpan data yang diperbarui kembali ke file JSON
    await saveUpdatedData(data);

    return foodToAdd;
  } catch (error) {
    console.error('Error adding new food:', error.message);
    return null;
  }
}

// Fungsi untuk menyimpan data yang telah diperbarui kembali ke file JSON
async function saveUpdatedData(updatedData) {
  try {
    const response = await axios.put(baseUrl, updatedData);
    if (!response.data) {
      throw new Error('Failed to update data');
    }
  } catch (error) {
    console.error('Error saving updated data:', error.message);
    throw error;
  }
}

// Fungsi untuk menghasilkan ID unik (contoh sederhana)
function generateUniqueId() {
  return Date.now(); // Menggunakan timestamp sebagai ID
}

// Contoh penggunaan: Menambahkan makanan baru
const newFood = {
  title: 'Gado-Gado',
  description: 'Salad sayur dengan bumbu kacang khas Indonesia.',
  image: 'https://source.unsplash.com/featured/?gado-gado',
  token: '...'
};

addNewFood(newFood)
  .then(addedFood => {
    if (addedFood) {
      console.log('Makanan berhasil ditambahkan:', addedFood);
    } else {
      console.log('Gagal menambahkan makanan baru.');
    }
  })
  .catch(err => {
    console.error('Terjadi kesalahan:', err);
  });


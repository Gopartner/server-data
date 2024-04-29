const axios = require('axios');

const baseUrl = 'https://raw.githubusercontent.com/Gopartner/server-data/Master/data%20json'

// Fungsi untuk mengambil data
async function fetchData() {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// Contoh penggunaan: Mengambil dan menampilkan data
fetchData()
  .then(data => {
    if (data) {
      console.log('Data berhasil diambil:', data);
    } else {
      console.log('Data tidak tersedia.');
    }
  })
  .catch(err => {
    console.error('Terjadi kesalahan:', err);
  });




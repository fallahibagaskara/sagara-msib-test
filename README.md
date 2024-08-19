# sagara-msib-test

Backend Project-based Test

## **Deskripsi**
Sistem manajemen inventaris sebuah toko baju. Sistem ini dapat menangani pembaruan stok baju, penambahan baju baru, dan pencarian baju berdasarkan warna dan ukuran.

## **Struktur Project**
- `utils/connection.js`: Koneksi ke database MongoDB.
- `controller/clothes.js`: Controller yang mengelola logika aplikasi terkait pakaian.
- `models/clothes.js`: Model yang menangani operasi database untuk koleksi pakaian.
- `index.js`: Titik masuk aplikasi, mengatur server dan routing.
- `routes/clothes.js`: Routing untuk endpoint pakaian,

## **Installasi**
1. `Clone repositori:`
```bash
   git clone https://github.com/fallahibagaskara/sagara-msib-test.git
   cd sagara-msib-test
   ```
2.  `Install Dependensi:`
npm install
3. `Rename file .example.env menjadi .env di root project dengan konfigurasi berikut:`
```bash 
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sagara
```
4. `Jalankan Aplikasi:`
```bash 
npm start
```

## **Endpoint API**
`GET /api/clothes`
Mengambil semua pakaian dan opsi query untuk mencari berdasarkan id, color, dan size.
Menggunakan query parameters untuk mencari pakaian berdasarkan id/warna/ukuran:
- Mencari berdasarkan ID: 
```bash 
http://localhost:3000/api/clothes?id=6bdau728jab63b862b6
```
- Mencari berdasarkan Warna: 
```bash 
http://localhost:3000/api/clothes?color=red
```
- Mencari berdasarkan Ukuran: 
```bash 
http://localhost:3000/api/clothes?size=M
```

`GET /api/clothes/out-of-stock`
Mengambil pakaian yang kehabisan stok.

`GET /api/clothes/low-stock`
Mengambil pakaian dengan stok kurang dari 5.

`POST /api/clothes/:id/add-stock`
Menambahkan stok untuk pakaian dengan ID yang ditentukan. Body request harus berisi amount (jumlah stok yang ingin ditambahkan).

`POST /api/clothes/:id/reduce-stock`
Mengurangi stok untuk pakaian dengan ID yang ditentukan. Body request harus berisi amount (jumlah stok yang ingin dikurangi).

`POST /api/clothes`
Menambahkan pakaian baru ke database. Body request harus berisi data pakaian.

`PUT /api/clothes/:id`
Memperbarui data pakaian dengan ID yang ditentukan. Body request dapat berisi color, size, price, dan stock.

`DELETE /api/clothes/:id`
Menghapus pakaian dengan ID yang ditentukan.

## **Penggunaan**
Aplikasi ini menggunakan Express sebagai server HTTP dan MongoDB untuk penyimpanan data. Anda dapat melakukan request HTTP menggunakan alat seperti curl, Postman, atau klien HTTP lainnya.

Berikut ini adalah contoh request menggunakan postman: 
https://web.postman.co/workspace/Clothes~0324197e-67e2-46a0-8a7d-a9ae10c87da6/collection/25926003-e60a69ea-e007-4eb8-8525-b803951ebec7

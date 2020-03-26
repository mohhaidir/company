# Hacktiv8 Pull Request System

⏰ Duration: 2.5 hours

Kamu diminta untuk membuat sebuah system untuk melakukan pemantauan status dari kode yang direview dan akan digunakan oleh team engineering di sebuah startup.
**Bacalah instruksi yang diberikan dengan teliti**

Nama database yang akan digunakan adalah: p1_live_code_week_4

[Link Demo](https://hacktiv-pr-systems.herokuapp.com/users)

> Release 0

Buatlah migration dan model untuk:

*1.  User*

-   name (string)
-   position (string)

*2.  Feature*

  -   name (string)
  -   scope (string)
  -   link\_to\_code (string)
  -   feature_code (string)
  -   is_reviewed (boolean)
  -   is_merged (boolean)

> Release 1

Relasi antara `User` dan `Feature` adalah sebagai berikut:

-   1 `User` bisa memiliki banyak `Feature`
-   1 `Feature` hanya bisa direview oleh 1 `User`

Buatlah migration baru untuk menambahkan kolom-kolom yang dibutuhkan sehingga bisa memenuhi kriteria diatas.

> Release 2

Buatlah _seeding_ untuk menginput list `User` yang akan terlibat dalam aplikasi ini.

| name          | position                 |
| ------------- | ------------------------ |
| John Doe      | Head of Engineer         |
| Steve Aoki    | Software Engineer        |
| Zaskia Gothic | Software Engineer        |
| Jeff Bezos    | Software Engineer        |

> Release 3

Buatlah routing yang **HARUS**  mengikuti format berikut:

| Method | Route                        | Description                                                                                                                             |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /users                       | Menampilkan seluruh `User` yang tersedia                                                                                                |
| POST   | /features/add                | Menambahkan data `Feature`                                                                                                              |
| GET    | /features/add                | Menampilkan form untuk menambahkan `Feature` yang akan direview                                                                         |
| GET    | /features/list/:userId       | Menampilkan seluruh `Feature` yang perlu direview oleh user tersebut                                                                    |
| GET    | /features/:featureId/approve | Melakukan approval terhadap `Feature`, dan melakukan perubahan pada field `is_reviewed` menjadi _true_ dan `is_merged` menjadi _true_   |
| GET    | /features/:featureId/reject  | Melakukan rejection terhadap `Feature`, dan melakukan perubahan pada field `is_reviewed` menjadi _true_ dan `is_merged` menjadi _false_ |
| GET    | /features/closed             | Menampilkan seluruh `Feature` yang telah diapprove                                                                                      |
| GET    | /features/:featureId/remove  | Menghapus feature **yang telah dimerged**                                                                                               |

> Release 4

Pada routing `/users`, tampilkanlah sebuah table yang berisi list dari user yang sudah diseed sebelumnya. Data yang akan ditampilkan terdiri dari `Nama`, `Position` dan `Action`. Pada kolom `Action` terdapat sebuah link bernama `See` yang akan menampilkan seluruh `Feature` yang perlu direview oleh user tersebut. Ketika `See` ini diklik, maka halaman user akan diredirect ke halaman `/features/list/:userId`. (Detail route `See` akan dilanjutkan pada Release 8)

> Release 5

Pada routing `/features/add` tampilkanlah form untuk menambahkan feature ke database dengan rule sebagai berikut:

-   input type `name` adalah text
-   input type `scope` adalah select, dimana optionnya adalah:
    -   FE
    -   BE
    -   INFRA
-   input type `link_to_code` adalah text
-   input type `user_id` adalah select, dimana optionnya diambil dari data `User` yang telah diseed sebelumnya dan disimpan di dalam database berupa ID relasi
-   button `submit` yang digunakan untuk melakukan submission data feature ke database

> Release 6

Masih berada dalam form pada release sebelumnya, tambahkanlah action pada button submit yang apabila ditekan akan mengakses routing `/features/add` dengan method POST dan akan menyimpan data ke database. Buatlah sebuah validasi, ketika field `name` atau `scope` tidak diisi makan akan menampilkan error message (diperbolehkan menggunakan res.send selama error message yang ditampilkan jelas dan sesuai dengan error yang terjadi).

> Release 7

Sebelum menyimpan data feature kedalam database, set `is_reviewed` dan `is_merged` menjadi _false_ dan serta buatlah hooks untuk mengenerate `feature_code` yang didapatkan dari hasil kombinasi field `scope` dan `name` dan setiap spasi akan digantikan dengan karakter `_`. Berikut contohnya:

-   name: Develop halaman add user
-   scope: FE
-   link\_to\_code: <https://github.com/raw/asd>
-   is_reviewed: false
-   is_merged: false
-   feature_code: FE\_Develop\_halaman\_add\_user (wajib dibuat melalui hooks)

Setelah data berhasil tersimpan di database, arahkan user pada halaman `/features/list/:userId`

> Release 8

Pada routing `/users` jika link `See` diklik pada salah satu row user, maka halaman akan berpindah ke `/features/list/:userId` yang menampilkan data feature yang harus direview oleh user tersebut dan akan ditampilkan data `Nama Feature`, `Scope`, `Link Code`, `Feature Code`, `Is Reviewed`, `Is Merged` dan `Action`.

> Release 9

Pada routing `/features/list/:userId`, akan ditampilkan data seluruh `Feature` yang harus direview oleh user tersebut. `Feature` yang akan ditampilkan hanyalah yang memiliki flag `is_merged` _false_. Buatlah 2 buah link di dalam kolom `Action` yaitu `Approve` dan `Reject` yang dimana setiap action akan diarahkan ke routing `/features/:featureId/approve` atau `/features/:featureId/reject` tergantung dari link yang ditekan. Untuk detail action `Approve` dan `Reject` akan dilanjutkan pada release 10.

> Release 10

Mengacu pada action `Approve` dan `Reject` di release 9. Lakukanlah hal-hal berikut:

- `Approve`
Ubahlah status `Feature` tersebut menjadi `is_merged` _true_ dan `is_reviewed` _true_, setelah action berhasil dilakukan `Feature` harus hilang dari list `Feature` yang harus direview dan arahkan user kembali ke routing `/features/list/:userId`

- `Reject`
Ubahlah status `Feature` tersebut menjadi `is_merged` _false_ dan `is_reviewed` _true_, setelah action berhasil dilakukan arahkan user kembali ke routing `/features/list/:userId` dengan status `Feature` yang sudah terupdate

> Release 11

Pada routing `/features/closed` tampilkanlah sebuah table yang berisi list dari seluruh `Feature` yang telah direview dan dimerged  dan terdiri dari data `Nama Feature`, `Scope`, `Link Code`, `Feature Code`, `Is Reviewed`, `Is Merged` dan `Action`.

> Release 12

Pada routing `/features/closed`, tambahkanlah sebuah link bernama `Remove`, yang ketika ditekan maka data feature akan terhapus dari database, gunakanlah routing `/features/:featuredId/remove`. Setelah feature berhasil dihapus, arahkan user kembali ke halaman `/features/closed`

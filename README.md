# İlan Sistemi Frontend

İlan sisteminin React tabanlı kullanıcı arayüzüdür.

Frontend; kullanıcı kaydı, giriş, ilan listeleme, ilan oluşturma, ilan görüntüleme, ilan güncelleme ve admin ilan yönetimi işlemlerini Spring Boot Ad Service ile entegre şekilde gerçekleştirir.

## Kullanılan Teknolojiler

- React
- JavaScript
- Vite
- Fetch API
- React Hooks
- ESLint
- Basic Authentication
- HTML
- CSS

---

## Backend

Frontend aşağıdaki backend servisi ile haberleşir:

```text
http://localhost:8080
```

Vite development server:

```text
http://localhost:5173
```

---

## Genel Mimari

```text
Browser
   |
   v
React Frontend
localhost:5173
   |
   | HTTP / Fetch / Basic Auth
   v
Ad Service
localhost:8080
   |
   +---- PostgreSQL
   |
   +---- RabbitMQ
              |
              v
       Reporting Service
```

---

## React Yapısı

Temel sayfalar:

```text
src/
├── components/
│   └── Header.jsx
│
├── pages/
│   ├── Register.jsx
│   ├── Login.jsx
│   ├── AdList.jsx
│   ├── AdDetail.jsx
│   ├── AdCreate.jsx
│   ├── AdUpdate.jsx
│   └── AdminPanel.jsx
│
└── App.jsx
```

---

## Register

Kullanıcı kayıt ekranı aşağıdaki endpoint'e bağlanır:

```http
POST /api/users/register
```

Form alanları:

```text
name
surname
phone
email
password
```

React tarafında form yönetimi `useState` ile yapılır.

---

## Login

Sistem Basic Authentication kullanır.

Login sırasında:

```text
email
+
password
↓
email:password
↓
Base64
↓
Authorization: Basic ...
```

Credentials başarılı şekilde doğrulandığında `App.jsx` içerisinde React state'inde tutulur.

Raw password `localStorage` içerisinde saklanmaz.

Sayfa yenilendiğinde authentication state sıfırlanır ve kullanıcının tekrar giriş yapması gerekir.

---

## Kullanıcı Rolü

Login sonrasında frontend:

```http
GET /api/users/me
```

endpoint'ini çağırır.

Buradan:

```text
email
role
```

bilgileri alınır.

Rol:

```text
USER
ADMIN
```

olabilir.

Admin paneli yalnızca frontend tarafında:

```text
role === ADMIN
```

olduğunda gösterilir.

Gerçek authorization kontrolü backend Spring Security tarafından yapılmaktadır.

---

## Son İlanlar

`AdList.jsx`:

```http
GET /api/ads/latest
```

endpoint'ini kullanır.

React tarafında kullanılan yapılar:

- `useEffect`
- `useState`
- `map`
- Conditional Rendering
- Loading state
- Error state

İlanlar dinamik olarak kart/listeler halinde ekrana basılır.

---

## İlan Oluşturma

`AdCreate.jsx`:

```http
POST /api/ads
```

endpoint'ine bağlanır.

Form alanları:

```text
title
description
price
city
category
```

Request içerisinde Basic Authentication header gönderilir.

Yeni ilan backend tarafından otomatik olarak:

```text
PASSIVE
```

durumuna alınır.

---

## İlan Detayı

`AdDetail.jsx`:

```http
GET /api/ads/{id}
```

endpoint'ine bağlanır.

Gösterilen bilgiler:

```text
title
description
price
city
category
viewCount
```

Bir ilana girildiğinde backend tarafındaki `viewCount` değeri artırılır.

---

## İlan Güncelleme

`AdUpdate.jsx`:

```http
PUT /api/ads/{id}
```

endpoint'ine bağlanır.

Öncelikle mevcut ilan:

```http
GET /api/ads/{id}
```

ile alınır.

Bilgiler form state'lerine aktarılır.

Kullanıcı değişiklik yaptıktan sonra PUT isteği gönderilir.

Kullanıcı yalnızca kendi ilanını güncelleyebilir.

Başkasına ait ilan güncellenmeye çalışıldığında backend yetkilendirme kontrolü devreye girer.

---

## Admin Paneli

`AdminPanel.jsx` yalnızca admin kullanıcısına gösterilir.

Pasif ilanlar:

```http
GET /api/admin/ads/passive
```

ile alınır.

Her ilan için:

```text
ONAYLA
REDDET
```

butonları bulunmaktadır.

---

## İlan Onaylama

```http
PUT /api/admin/ads/{id}/approve
```

Başarılı işlemden sonra pasif ilan listesi yeniden yüklenir.

Onaylanan ilan pasif listeden çıkar.

Backend tarafında onaylanan ilan RabbitMQ entegrasyonunu tetikler.

---

## İlan Reddetme

```http
PUT /api/admin/ads/{id}/reject
```

Başarılı işlemden sonra liste tekrar yüklenir.

---

## Authentication State

Authentication bilgisi `App.jsx` içerisinde tutulur.

Örnek component veri akışı:

```text
Login
  |
  | onLogin(credentials)
  v
App
  |
  +----> AdList
  |
  +----> AdCreate
  |
  +----> AdDetail
  |
  +----> AdUpdate
  |
  +----> AdminPanel
```

Credentials gerekli component'lere props aracılığıyla gönderilir.

---

## CORS

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8080
```

üzerinde çalıştığı için backend üzerinde CORS yapılandırması yapılmıştır.

---

## Projenin Kurulumu

Node.js ve npm yüklü olmalıdır.

Repository klonlandıktan sonra:

```bash
npm install
```

çalıştırılır.

Development server:

```bash
npm run dev
```

ile başlatılır.

Tarayıcı:

```text
http://localhost:5173
```

adresinden açılır.

---

## Backend Gereksinimi

Frontend tek başına bütün fonksiyonları çalıştıramaz.

Aşağıdakilerin çalışıyor olması gerekir:

```text
Ad Service     → localhost:8080
PostgreSQL
RabbitMQ
Reporting Service → localhost:8081
```

Admin onayının raporlama sistemine kadar doğrulanabilmesi için RabbitMQ ve Reporting Service de aktif olmalıdır.

---

## Uçtan Uca Sistem Akışı

```text
Register
   |
   v
Login
   |
   v
İlan Oluştur
   |
   v
İlan Güncelle
   |
   v
PASSIVE
   |
   v
Admin Login
   |
   v
Admin Panel
   |
   v
ONAYLA
   |
   v
Ad Service
   |
   v
RabbitMQ
   |
   v
Reporting Service
   |
   v
Rapor DB
   |
   v
Son 10 Onaylı İlan
```

---

## Error Handling

Frontend üzerinde API çağrılarında HTTP response kontrolü yapılır.

Örnek hata durumları:

```text
401 → Authentication problemi
403 → Authorization / yetki problemi
404 → Endpoint veya kaynak bulunamadı
409 → İş kuralı çakışması
500 → Backend/internal integration problemi
Failed to fetch → bağlantı veya CORS problemi
```

Loading ve error state'leri kullanılarak kullanıcıya uygun durum mesajları gösterilir.

---

## Proje Durumu

- [x] React + Vite kurulumu
- [x] Component yapısı
- [x] Props
- [x] State
- [x] useEffect
- [x] Form yönetimi
- [x] Kullanıcı kaydı
- [x] Login
- [x] Basic Authentication
- [x] Rol bilgisini alma
- [x] İlan listeleme
- [x] İlan oluşturma
- [x] İlan detayı
- [x] View count
- [x] İlan güncelleme
- [x] Loading state
- [x] Error state
- [x] Conditional rendering
- [x] Admin paneli
- [x] Pasif ilan listesi
- [x] İlan onaylama
- [x] İlan reddetme
- [x] Backend entegrasyonu
- [x] RabbitMQ akışının frontend üzerinden tetiklenmesi
- [x] Uçtan uca sistem testi

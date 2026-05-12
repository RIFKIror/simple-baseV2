# ☁️ Simple Base V2 Button

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![NPM](https://img.shields.io/badge/NPM-enabled-red)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow)
![Baileys](https://img.shields.io/badge/Baileys-@dnuzi/baileys-purple)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue)
---

• Base bot adalah template untuk membuat bot WhatsApp sehingga kamu tidak perlu membuat sistem bot dari nol lagi.  
• Base ini dikembangkan oleh `KyynXz` menggunakan library Baileys `@dnuzi/baileys`.

## Berikut beberapa fitur yang tersedia:
- ESM MODULE
- Ringan & Mudah digunakan
- Custom Pairing Code
- Support Button & nativeFloorMessage
- Plugin Handler
- Manage Plugin
- Menggunakan baileys @dnuzi/baileys
- Newstlateer Message
- Fitur Add Plugin (Owner)
- Fitur Hapus Plugin (Owner)
- Fitur GetPlugin (Owner)
- Fitur List Plugin (Owner)
- Support run di termux/panel pterodactyl
---
# 📂 Struktur Folder

```txt
simple-baseV2/
├── plugins/
├── handler/
├── lib/
├── settings.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```
## ⭐ Penjelasan Struktur Folder/File
```txt
plugins/ => Folder untuk menyimpan fitur plugins (menu, info, dll)
handler/ => Berisi sistem handler bot
lib/     => Berisi utils dan loader function
settings.js => Konfigurasi bot seperti nama bot, owner, pairing code, dll
index.js    => File utama untuk menjalankan bot (connetToWhatsapp)
```
---
## ⚙️ Konfigurasi Bot (settings.js)
```javascript
global.nameBot   => Nama Bot (Contoh : LexBot)
global.owner     => Nomor Owner Bot, gunakan array ['nomor owner']
global.ownerName => Nama Owner (Bebas)
global.dev       => Developer Bot (KyynXz)
global.prefix    => Custom prefix (., !, #)
global.version   => Versi Bot (Contoh : 1.0.0)
global.footer    => Footer (teks bawah bot)
global.sessionName => session (Disarankan tidak diubah)
global.thumb       => thumbnail bot (Disarankan link image)
global.customPairing => Custom pairing code (minimal 8 karakter, contoh : KYYNXYZN)
```

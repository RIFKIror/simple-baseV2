# ☁️ Simple Base V2 Button

Base bot adalah template untuk membuat bot WhatsApp sehingga kamu tidak perlu membuat sistem bot dari nol lagi.  
Base ini dikembangkan oleh `KyynXz` menggunakan library Baileys `@dnuzi/baileys`.

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

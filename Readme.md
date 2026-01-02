# Hover Portrait

A premium-quality Foundry VTT module that displays a **custom portrait** when hovering over tokens.  
Includes a **sandboxed portrait picker**, **auto‑discovered folders**, **video support**, and a **clean, modern UI** designed for zero ambiguity and maximum usability.

This module is system‑agnostic and works with **any game system**.

---

## ✨ Features

### 🎨 Custom Hover Portraits
- Displays a portrait when hovering over any token.
- Supports **images and videos** (`png`, `jpg`, `webp`, `gif`, `webm`, `mp4`, etc.).
- Portraits can be styled with multiple border themes.

![full](https://github.com/user-attachments/assets/d5872024-1832-4887-ac54-da798a3ec429)
![icon](https://github.com/user-attachments/assets/f2238693-3615-411c-91b6-9749916963e7)


### 🗂️ Sandboxed Portrait Picker
- Fully custom picker — **no Foundry FilePicker UI**.
- Browses only inside:  
  `modules/hover-portrait/assets/portraits` You can create additional folders and the module will pick them up.
- Auto-detects subfolders and creates category buttons.
- Clean grid layout with image/video previews.
- One-click assignment to both **actor** and **token** flags.
![box](https://github.com/user-attachments/assets/c0c27e25-ff21-4ec5-9f7a-9847bf951f60)

![options](https://github.com/user-attachments/assets/b48eef90-2641-4764-8497-6e46f8e8e042)


### 🔄 Token Inheritance
- Newly created tokens automatically inherit the actor’s saved portrait.

### 🧩 Zero Interference
- No UI collisions.
- No resizing logic (removed for stability).
- No reliance on deprecated Foundry globals.

---

## 📦 Installation

### **Method 1: Install via Manifest URL** 

Paste this URL into Foundry’s “Install Module” dialog: 

https://raw.githubusercontent.com/Ramz1337/hover-portrait/main/module.json


### **Method 2: Install from GitHub**

1. Download the ZIP from:
2. [hover-portrait-v2.3.2.zip](https://github.com/user-attachments/files/24404138/hover-portrait-v2.3.2.zip)
4. Extract it into your Foundry `Data/modules` folder.
5. Make sure the directory is called hover-portrait
6. Restart Foundry and enable the module.








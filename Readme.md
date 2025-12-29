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

### 🗂️ Sandboxed Portrait Picker
- Fully custom picker — **no Foundry FilePicker UI**.
- Browses only inside:  
  `modules/hover-portrait/assets/portraits` You can create additional folders and the module will pick them up.
- Auto-detects subfolders and creates category buttons.
- Clean grid layout with image/video previews.
- One-click assignment to both **actor** and **token** flags.

### 🔄 Token Inheritance
- Newly created tokens automatically inherit the actor’s saved portrait.

### 📌 Pinning Support
- Portrait window can be pinned in place (per-user setting).

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
   https://github.com/Ramz1337/hover-portrait/archive/refs/heads/main.zip  
2. Extract it into your Foundry `Data/modules` folder.
3. Restart Foundry and enable the module.


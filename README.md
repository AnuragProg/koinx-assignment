
# Crypto Stats API

A server-side application built with **Node.js** and **MongoDB** to fetch, store, and analyze cryptocurrency data.

---

## **Features**
- [x] **Background Job**: Fetches and stores price, market cap, and 24h change for Bitcoin, Matic, and Ethereum every 2 hours.
- [x] **API Endpoints**:
  - `/stats`: Returns the latest data for a requested cryptocurrency.
  - `/deviation`: Returns the standard deviation of the price for the last 100 records.
- [x] **Deployment**: Hosted on [Render](https://render.com/) with public API access.
- [x] **Database**: MongoDB Atlas for production-grade data storage.
- [x] **Code Quality**: Clean and modular codebase
- [x] **Version Control**: Git with meaningful commit messages.

---

## **Optional Tasks**
- [x] **Database Deployment**: MongoDB Atlas used for production.
- [x] **Backend Deployment**: Hosted on https://koinx-assignment-l63h.onrender.com.
- [x] **Code Hosting**: GitHub repository available at https://github.com/AnuragProg/koinx-assignment.

---

## **Background Job**
- Fetches data from CoinGecko API every 2 hours.
- Stores the data in MongoDB.

---

## **Deployment**

### **Access the API**
The API is hosted on [Render](https://render.com/). You can access it at:
```
https://koinx-assignment-l63h.onrender.com
```

### **Example Requests**
1. Get latest stat for Bitcoin:
   ```bash
   curl https://koinx-assignment-l63h.onrender.com/stats?coin=bitcoin
   ```
2. Get price standard deviation for Ethereum:
   ```bash
   curl https://koinx-assignment-l63h.onrender.com/deviation?coin=ethereum
   ```

---



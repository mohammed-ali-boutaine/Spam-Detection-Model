# Frontend - Spam Detection Model

React + TypeScript frontend application for spam email detection.

## 🏗️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library


---

## 🔧 Nginx Configuration

The frontend uses **nginx** as a web server in production (Docker deployment). The configuration is defined in [`nginx.conf`](nginx.conf).

### **What is nginx?**

nginx is a high-performance web server and reverse proxy that:
- ✅ Serves static files (HTML, CSS, JS) efficiently
- ✅ Routes API requests to the backend
- ✅ Handles CORS automatically
- ✅ Provides a single entry point for the entire application

### **Configuration Breakdown**

#### **1. Basic Server Setup**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
}
```

- **`listen 80`**: nginx listens on port 80 (standard HTTP port)
- **`server_name localhost`**: Responds to requests for `localhost` (change to your domain in production)
- **`root /usr/share/nginx/html`**: Directory where built React files are stored in Docker container
- **`index index.html`**: Default file to serve when accessing the root path

#### **2. Frontend Routing (SPA Support)**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Purpose**: Enable client-side routing for React Router

**How it works**:
1. **`$uri`**: First, try to serve the exact file requested
   - Example: `/assets/logo.png` → serves the actual logo file
2. **`$uri/`**: If not found, try as a directory
   - Example: `/assets/` → tries to serve `assets/index.html`
3. **`/index.html`**: If still not found, serve `index.html`
   - Example: `/about` → serves `index.html`, React Router handles `/about` route

**Why is this needed?**

React is a Single Page Application (SPA). All routes like `/about`, `/contact`, etc., don't exist as separate HTML files. They're handled by React Router on the client side. Without this configuration, refreshing the page on `/about` would result in a 404 error.

---

## 🔄 Reverse Proxy Configuration

The most important part of the nginx config is the **reverse proxy** setup:

```nginx
location /api {
    proxy_pass http://backend:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### **What is a Reverse Proxy?**

A reverse proxy sits between clients and backend servers, forwarding client requests to the appropriate backend service.

```
┌─────────┐      ┌───────────┐      ┌─────────┐
│ Browser │ ───► │   nginx   │ ───► │ Backend │
│         │      │  (proxy)  │      │ FastAPI │
└─────────┘      └───────────┘      └─────────┘
    ↑                                     │
    └─────────────────────────────────────┘
```

### **Configuration Details**

#### **`location /api`**
- Intercepts all requests starting with `/api`
- Examples:
  - `http://localhost/api/check-mail` → proxied to backend
  - `http://localhost/api/health` → proxied to backend
  - `http://localhost/about` → NOT proxied (served by React)

#### **`proxy_pass http://backend:8000;`**
- Forwards requests to the backend service
- **`backend`**: Service name from [`docker-compose.yaml`](../docker-compose.yaml)
- **`:8000`**: Port where FastAPI is running inside the container
- Docker's internal DNS resolves `backend` to the backend container's IP

**Example flow**:
```
Browser request: http://localhost/api/check-mail
                 ↓
nginx receives:  /api/check-mail
                 ↓
proxy_pass to:   http://backend:8000/api/check-mail
                 ↓
FastAPI handles: POST /api/check-mail
```

#### **`proxy_set_header Host $host;`**
- Preserves the original `Host` header from the client's request
- The backend sees the original hostname (`localhost` or your domain)
- Important for applications that check the Host header

#### **`proxy_set_header X-Real-IP $remote_addr;`**
- Forwards the client's real IP address to the backend
- Without this, backend would only see nginx's IP
- Useful for:
  - Rate limiting based on client IP
  - Logging and analytics
  - Geolocation features

---

## 🐳 Docker Integration

When running with Docker Compose:

```yaml
# docker-compose.yaml
services:
  frontend:
    ports:
      - "80:80"  # Host port 80 maps to container port 80 (nginx)
  
  backend:
    # No need to expose port 8000 publicly
    # nginx proxies requests internally
```

### **Network Flow**:

```
┌──────────────────────────────────────────────────────┐
│                     Host Machine                     │
│                                                      │
│  Browser → http://localhost/                         │
│            http://localhost/api/check-mail           │
└────────────────────┬─────────────────────────────────┘
                     │ Port 80
┌────────────────────┴─────────────────────────────────┐
│              Docker Network (bridge)                 │
│                                                      │
│  ┌──────────────────┐         ┌──────────────────┐   │
│  │    frontend      │         │     backend      │   │
│  │  (nginx:80)      │────────►│   (FastAPI:8000) │   │
│  │                  │ proxy   │                  │   │
│  └──────────────────┘         └──────────────────┘   │
└──────────────────────────────────────────────────────┘
```

### **Advantages of This Setup**:

1. ✅ **Single Entry Point**: Everything goes through port 80
2. ✅ **No CORS Issues**: Frontend and API appear to be on the same origin
3. ✅ **Security**: Backend isn't directly exposed to the internet
4. ✅ **Simplified Client Code**: API calls use relative URLs like `/api/check-mail`
5. ✅ **Production Ready**: nginx handles static files efficiently

---

## ⚙️ Environment Configuration

The frontend API URL can be configured via environment variables:

```typescript
// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

### **Development** (without Docker):
```env
# .env.development
VITE_API_URL=http://localhost:8000
```

Direct connection to FastAPI dev server.

### **Production** (with Docker + nginx):
```env
# .env.production
VITE_API_URL=/api
```

Use relative URL - nginx proxies `/api` requests to backend.

---

---

## 📁 Project Structure

```
frontend/
├── nginx.conf          # Production nginx configuration
├── Dockerfile          # Multi-stage build (npm build + nginx serve)
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── public/             # Static assets (copied as-is)
└── src/
    ├── main.tsx        # Application entry point
    ├── App.tsx         # Main app component
    ├── types.ts        # TypeScript type definitions
    ├── components/     # Reusable UI components
    │   ├── EmailInput.tsx
    │   ├── PredictButton.tsx
    │   ├── ResultCard.tsx
    │   ├── HistoryList.tsx
    │   ├── ErrorMessage.tsx
    │   ├── Header.tsx
    │   └── Spinner.tsx
    └── services/
        └── api.ts      # API client for backend communication
```


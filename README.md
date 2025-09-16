# Superhero Management App

**Superhero Management App** — це веб-застосунок для управління супергероями.  
Проект складається з двох основних частин: бекенд на **Nest.js** та фронтенд на **React + TypeScript**.  
Для зберігання даних використовується **PostgreSQL** (Docker), а для зображень — сервіс **Cloudinary**.

## Технології

**Бекенд:** Nest.js, TypeScript, PostgreSQL, Prisma, Docker, Cloudinary  
**Фронтенд:** React.js, TypeScript, Material UI, Axios, Zod

## Вимоги

Перед початком роботи переконайтесь, що у вас встановлено: Node.js (18.x+), npm, Docker, Git

## Налаштування та запуск проекту

### 1. Клонування репозиторію

```bash
git clone https://github.com/oleg191006/Superhero_app.git
cd Superhero_app
```

2. Налаштування бекенду (Nest.js)

```bash
cd BACKEND
```

3.Створіть файл .env у корені папки backend:

```bash
# -------------------------
# Database Configuration
# -------------------------
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_DATABASE=superhero
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5434/${POSTGRES_DATABASE}?schema=public"

# -------------------------
# Cloudinary Configuration
# -------------------------
CLOUDINARY_CLOUD_NAME=<ваш Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<ваш Cloudinary API Key>
CLOUDINARY_API_SECRET=<ваш Cloudinary API Secret>

# -------------------------
# Frontend URL (CORS)
# -------------------------
CLIENT_URL=http://localhost:5173
```

4.Встановіть залежності та згенеруйте Prisma Client:

```bash
npm install
npx prisma generate
```

5.Запустіть базу даних PostgreSQL через Docker:

```bash
docker-compose up -d
```

6.Запустіть бекенд:

```bash
npm run start:dev
```

3. Налаштування фронтенду (React)

```bash
cd FRONTEND
```

1.Створіть .env файл у корені frontend:

```bash
VITE_API_BASE_PATH=http://localhost:3000
```

2.Встановіть залежності та запустіть фронтенд:

```bash
npm install
npm run dev
```

Фронтенд доступний за http://localhost:5173

## Демонстрація роботи програми

https://github.com/user-attachments/assets/0fe2e509-418d-4d00-ab76-e0153c869fca



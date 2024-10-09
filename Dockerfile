# Стадия 1: Сборка приложения
FROM node:21-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /opt/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы и собираем приложение
COPY . .
RUN npm run build

# Стадия 2: Запуск приложения
FROM node:21-alpine

# Устанавливаем рабочую директорию
WORKDIR /opt/app

# Устанавливаем зависимости для продакшн
COPY package*.json ./
RUN npm install --only=production

# Копируем собранные файлы из первой стадии
COPY --from=build /opt/app/build /opt/app/build
COPY --from=build /opt/app/node_modules /opt/app/node_modules

# Команда для запуска собранного приложения
CMD ["node", "build/index.js"]
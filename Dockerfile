# Стадия 1: Сборка приложения
FROM node:21-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /opt/app

# Копируем файлы и собираем приложение
COPY . .
RUN npm install
RUN npm run build

# Стадия 2: Запуск приложения
FROM node:21-alpine as run

# Устанавливаем рабочую директорию
WORKDIR /opt/app

# Копируем собранные файлы из первой стадии
COPY --from=build /opt/app/build /opt/app/build

# Команда для запуска собранного приложения
CMD ["node", "build/index.js"]
FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

  
#Flujo multistage para usar imagenes distroless
# FROM node:24-slim AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build


# FROM gcr.io/distroless/nodejs22-debian12

# WORKDIR /app

# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./

# EXPOSE 3000

# CMD ["dist/main.js"]
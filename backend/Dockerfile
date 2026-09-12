# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Dependencias y configuración de Prisma
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

RUN npm ci

# Generar cliente de Prisma
ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"
RUN npx prisma generate

# Copiar código fuente y compilar
COPY tsconfig*.json nest-cli.json ./
COPY src ./src/
RUN npm run build

# Podar dependencias de desarrollo
RUN npm prune --production

# Stage 2: Producción
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

USER node

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma
COPY --chown=node:node --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/src/main.js"]

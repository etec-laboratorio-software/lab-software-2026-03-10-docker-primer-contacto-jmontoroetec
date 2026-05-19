FROM node:20-alpine

WORKDIR /app

# Copy package metadata first to cache dependencies layer
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Start: push schema, seed (non-fatal), then run dev server
CMD ["sh", "-c", "npx prisma db push --skip-generate && (npx prisma db seed || true) && npm run dev"]

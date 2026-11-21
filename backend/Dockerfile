# ==========================================
# Stage 1: Build Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files, prisma schema, and prisma config first
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install all dependencies (including devDependencies for building TypeScript and generating Prisma)
RUN npm ci

# Copy the rest of the backend source code
COPY . .

# Provide a dummy DATABASE_URL during build time so prisma.config.ts doesn't fail on generation
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# Generate Prisma Client and build TypeScript code
RUN npx prisma generate
RUN npm run build

# ==========================================
# Stage 2: Production Stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy generated Prisma Client from the builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Copy built JavaScript files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your backend runs on (adjust if needed)
EXPOSE 3001

# Start the server
CMD ["node", "dist/server.js"]

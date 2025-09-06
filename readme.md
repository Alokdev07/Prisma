# 📘 Prisma Commands Reference Guide

A comprehensive reference for all essential Prisma CLI commands you'll use in your project development workflow.

---

## Table of Contents

- [Installation](#-installation)
- [Initialization](#️-initialization)
- [Database Migrations](#️-database-migrations)
- [Database Management](#️-database-management)
- [Prisma Client](#️-prisma-client)
- [Database Exploration](#-database-exploration)
- [Schema Management](#-schema-management)
- [Debugging & Utilities](#-debugging--utilities)
- [Typical Workflow](#-typical-workflow)
- [Quick Start Example](#-quick-start-example)

---

## 📦 Installation

Install Prisma as a development dependency and the Prisma Client:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

---

## ⚙️ Initialization

Initialize a new Prisma project:

```bash
npx prisma init
```

**Creates:**
- `prisma/schema.prisma` - Your database schema file
- `.env` file with `DATABASE_URL` placeholder

---

## 🗄️ Database Migrations

### Create and Apply Migration
Create a new migration and apply it to your database:

```bash
npx prisma migrate dev --name <migration_name>
```

### Deploy Migrations
Deploy pending migrations to the database (production use):

```bash
npx prisma migrate deploy
```

### Reset Database
⚠️ **Warning:** This deletes all data and re-applies all migrations:

```bash
npx prisma migrate reset
```

### Check Migration Status
View the status of your migrations:

```bash
npx prisma migrate status
```

### Create Migration Draft
Create a migration without applying it:

```bash
npx prisma migrate diff
```

---

## 🗃️ Database Management

### Push Schema Changes
Push schema changes directly to the database without creating migrations:

> ⚠️ **Note:** Not recommended for production environments

```bash
npx prisma db push
```

### Pull Schema from Database
Generate Prisma schema from an existing database:

```bash
npx prisma db pull
```

### Seed Database
Run your database seeding script:

```bash
npx prisma db seed
```

### Execute Raw SQL
Execute a SQL script file:

```bash
npx prisma db execute --file ./script.sql
```

---

## 🛠️ Prisma Client

### Generate Client
Generate the Prisma Client based on your schema:

```bash
npx prisma generate
```

### Validate Schema
Check if your schema is valid:

```bash
npx prisma validate
```

### Format Schema
Auto-format your Prisma schema file:

```bash
npx prisma format
```

---

## 🔍 Database Exploration

### Open Prisma Studio
Launch the visual database browser:

```bash
npx prisma studio
```

Prisma Studio provides a web-based GUI to view and edit your data.

---

## 📑 Schema Management

### Schema Introspection
Introspect and update your schema from the database:

```bash
npx prisma db pull
```

### Validate Schema
Ensure your schema syntax is correct:

```bash
npx prisma validate
```

### Format Schema File
Clean up and format your schema:

```bash
npx prisma format
```

---

## 🧪 Debugging & Utilities

### Enable Query Logging
Add logging to your Prisma Client for debugging:

```javascript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### Check Prisma Version
Display the current Prisma version:

```bash
npx prisma -v
```

---

## 📝 Typical Workflow

Follow this standard workflow when working with Prisma:

1. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

2. **Edit your schema**
   - Modify `prisma/schema.prisma`
   - Configure your `DATABASE_URL` in `.env`

3. **Create and apply migration**
   ```bash
   npx prisma migrate dev --name <descriptive_name>
   ```

4. **Generate the client**
   ```bash
   npx prisma generate
   ```

5. **Explore your data**
   ```bash
   npx prisma studio
   ```

---

## 🚀 Quick Start Example

Complete setup for a new project:

```bash
# Install dependencies
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init

# Create initial migration
npx prisma migrate dev --name init

# Generate client
npx prisma generate

# Launch database browser
npx prisma studio
```

---

## 💡 Pro Tips

- Always run `npx prisma generate` after schema changes
- Use descriptive names for your migrations
- Keep your schema file formatted with `npx prisma format`
- Use Prisma Studio to quickly inspect and modify data during development
- In production, use `npx prisma migrate deploy` instead of `migrate dev`

---

*Happy coding with Prisma! 🎉*
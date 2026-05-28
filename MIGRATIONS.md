# Database Migrations Guide

This guide explains how to manage database schema changes using TypeORM migrations.

## Why Use Migrations?

- **Version Control**: Track database schema changes alongside code changes
- **Consistency**: Ensure all environments (dev, staging, production) have the same schema
- **Safety**: Avoid manual SQL changes that can lead to errors
- **Rollback**: Ability to revert changes if something goes wrong

## Available Commands

```bash
# Generate a migration based on entity changes
npm run migration:generate src/migrations/MigrationName

# Create an empty migration file (for manual SQL)
npm run migration:create src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

## Development Workflow

### 1. Make Changes to Your Entities

Example: Add a new column to the Room entity

```typescript
// src/entities/room.ts
@Column("varchar", { name: "floor", length: 10, nullable: true })
floor?: string;
```

### 2. Generate Migration

After modifying your entities, generate a migration:

```bash
npm run migration:generate src/migrations/AddFloorToRoom
```

This will create a file like `src/migrations/1234567890-AddFloorToRoom.ts` with:

- `up()` method: SQL to apply changes
- `down()` method: SQL to revert changes

### 3. Review the Generated Migration

Always review the generated migration file to ensure it does what you expect:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFloorToRoom1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE roomTbl ADD floor varchar(10) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE roomTbl DROP COLUMN floor`);
  }
}
```

### 4. Run the Migration

```bash
npm run migration:run
```

## Production Deployment Workflow

### Option 1: Run Migrations Manually (Recommended)

1. **Deploy your code** to EC2
2. **SSH into your EC2 instance**
3. **Navigate to your project directory**
4. **Run migrations before starting the app**:

```bash
cd /path/to/your/app
npm run migration:run
pm2 restart your-app  # or however you restart your app
```

### Option 2: Automatic Migration on App Start

Set `migrationsRun: true` in [data-source.ts](src/data-source.ts):

```typescript
export default new DataSource({
  // ... other config
  migrationsRun: true, // Auto-run migrations on app start
});
```

⚠️ **Warning**: This will run migrations automatically when the app starts. Good for small apps, but can cause issues with multiple instances or during deployments.

### Option 3: Include in Deployment Script

Create a deployment script that runs migrations:

```bash
#!/bin/bash
# deploy.sh

git pull origin main
npm install
npm run build
npm run migration:run  # Run migrations
pm2 restart finago-hotel-api
```

## Creating Manual Migrations

For complex changes or data migrations:

```bash
npm run migration:create src/migrations/CustomDataMigration
```

Then edit the file manually:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomDataMigration1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Your custom SQL or TypeORM queries
    await queryRunner.query(`
            UPDATE roomTbl 
            SET floor = '1' 
            WHERE roomNumber LIKE '1%'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the changes
    await queryRunner.query(`
            UPDATE roomTbl 
            SET floor = NULL 
            WHERE floor = '1'
        `);
  }
}
```

## Best Practices

### 1. Always Test Migrations Locally First

```bash
# Test up
npm run migration:run

# Test down
npm run migration:revert

# Test up again
npm run migration:run
```

### 2. Never Edit Migrations That Have Been Run

Once a migration has been executed in any environment, create a new migration to make changes.

### 3. Keep Migrations Small

One migration per logical change makes it easier to debug and rollback.

### 4. Backup Before Running in Production

```bash
# MySQL backup example
mysqldump -u username -p finago_hotel > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 5. Check Migration Status

Before deploying, check what migrations will run:

```bash
npm run migration:show
```

## Rollback Strategy

If a migration causes issues in production:

```bash
# Revert the last migration
npm run migration:revert

# Restart your app
pm2 restart finago-hotel-api
```

## Example: Complete Workflow

Let's say you want to add a `maxGuests` field to rooms:

1. **Update entity**:

```typescript
// src/entities/room.ts
@Column("int", { name: "maxGuests", default: 2 })
maxGuests!: number;
```

2. **Generate migration**:

```bash
npm run migration:generate src/migrations/AddMaxGuestsToRoom
```

3. **Review the generated file**:

```typescript
// src/migrations/1234567890-AddMaxGuestsToRoom.ts
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE roomTbl ADD maxGuests int NOT NULL DEFAULT 2`);
}
```

4. **Test locally**:

```bash
npm run migration:run
# Test your app
npm run migration:revert  # if needed
```

5. **Commit to Git**:

```bash
git add src/entities/room.ts src/migrations/
git commit -m "Add maxGuests field to Room"
git push
```

6. **Deploy to EC2**:

```bash
ssh your-ec2
cd /path/to/app
git pull
npm install
npm run migration:run
pm2 restart finago-hotel-api
```

## Troubleshooting

### Migration Already Exists Error

If you get "QueryFailedError: Table already exists":

- Your database might already have the changes
- Check migration status: `npm run migration:show`
- Manually mark migration as run or drop the table and re-run

### Migration Fails

- Check the error message carefully
- Review the generated SQL
- Test on a copy of production database first
- Always have a backup before running migrations in production

### Multiple Instances Running

If you have multiple EC2 instances:

- Run migrations from only ONE instance
- Use a deployment tool/script to ensure only one instance runs migrations
- Or run migrations manually before deployment

## Environment Variables

Make sure your `.env` file has correct database credentials:

```env
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=3306
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_DATABASE=finago_hotel
DB_SYNCHRONIZE=false  # Always false in production!
```

## Additional Resources

- [TypeORM Migrations Documentation](https://typeorm.io/migrations)
- [NestJS TypeORM Documentation](https://docs.nestjs.com/techniques/database)

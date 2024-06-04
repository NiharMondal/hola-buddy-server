# Get started

At first clone this repository.

```
npm install
```

Then create **.env.local** and replace your _.env.local_ file.  
Your **.env.local** file should be like this:

```
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="your_supabase_credentials"

# Direct connection to the database. Used for migrations.
DIRECT_URL="your_supabase_credentials"

JWT_SECRET= "your_secret"
EXPIRES_IN= 1d
SALT_ROUND= 10
```

### You just set up environment.

```
npm run dev
```

#### That's it. You are ready to use this application.

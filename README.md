## NextJS notes app - [next-notes-app-inky.vercel.app](https://next-notes-app-inky.vercel.app/)
> A notes app built using [NextJS](https://nextjs.org/) and [PocketBase](https://pocketbase.io/).


### To get started...

```bash
git clone https://github.com/chinmaykunkikar/next-notes.git
```
0. Follow the instructions from [official PocketBase documentaion](https://pocketbase.io/docs/), or host the backend using [pockethost.io](https://pockethost.io/).

1. Create a PocketBase collection (say _notes_) with two fields - `title` and `content`.

2. Create a `.env.local` file in the project root to store secrets and environment variables

```bash
touch .env.local
```

3. Set the following varibles in the `.env.local` file -

```text
NEXT_PUBLIC_PB_HOST=            // PocketBase URL (http://127.0.0.1:8090/)
NEXT_PUBLIC_PB_COLLECTION=      // PocketBase collection name ('notes')
NEXT_PUBLIC_PB_USER=            // PocketBase username
NEXT_PUBLIC_PB_PASS=            // PocketBase password
```

4. Install npm dependencies
```bash
npm install
```

5. To run the app, use
```bash
npm run dev
```

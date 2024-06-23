## Getting Started

# First, clone the project:

```bash
git clone https://github.com/daviardev/tiktok-clone.git

```

# Second, install all dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

# Third, run developent server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Fourth, sets the environment variables

```bash
# Firebase
NEXT_PUBLIC_APIKEY=
NEXT_PUBLIC_AUTHDOMAIN=
NEXT_PUBLIC_PROJECTID=
NEXT_PUBLIC_STORAGEBUCKET=
NEXT_PUBLIC_MESSAGINGSENDERID=
NEXT_PUBLIC_APPID=

# SDK Web
SDK_CLIENT_ID=
SDK_SECRET_CLIENT=

# NextJS
NEXTAUTH_SECRET=''
NEXTAUTH_URL=http://localhost:3000/
```

Use firebase to the create database and authentication firebase for get SDK

in your terminal type the following `openssl rand -base64 32` for `NEXTAUTH_SECRET` env

## License
Distributed under the MIT License. See LICENSE for more information.
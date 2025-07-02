# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring real-time integrations with Spotify and WakaTime.

## Features

- 🎵 **Spotify Integration** - Shows currently playing or recently played tracks
- ⌨️ **WakaTime Integration** - Displays coding activity and statistics
- 🌙 **Dark/Light Mode** - Theme switching support
- 📱 **Responsive Design** - Looks great on all devices
- ⚡ **Fast Performance** - Built with Next.js 15
- 🎨 **Modern UI** - Clean design with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Spotify Developer Account (optional)
- WakaTime Account (optional)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio_update_april
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Configure your API keys (see setup instructions below)

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Integrations Setup

### Spotify Integration

To display your currently playing music:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:3000` to redirect URIs
4. Get your Client ID and Client Secret
5. Generate a refresh token using the Spotify Web API
6. Add these to your `.env.local`:

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

### WakaTime Integration

To display your coding activity:

1. Sign up at [WakaTime](https://wakatime.com)
2. Install the WakaTime plugin for your code editor
3. Get your API key from [Account Settings](https://wakatime.com/api-key)
4. Add it to your `.env.local`:

```env
WAKATIME_API_KEY=your_api_key
```

The WakaTime integration shows:
- Current coding status (active/inactive)
- Today's coding time
- This week's total coding time
- Top language and project for today
- Current project and language (when actively coding)

## Customization

### Personal Information
Edit the content in `app/page.tsx` to update:
- Name and description
- Profile picture (`public/jaedon.svg`)
- Work experience
- Projects

### Styling
- Color scheme: Modify colors in `tailwind.config.ts`
- Typography: Update font settings in `app/globals.css`
- Components: Customize UI components in `components/ui/`

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

Remember to add your production URL to your Spotify app's redirect URIs.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## License

MIT License - see LICENSE file for details.

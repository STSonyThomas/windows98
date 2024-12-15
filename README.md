# Windows 98 Portfolio with Clippy

A nostalgic Windows 98-themed portfolio viewer featuring an integrated Clippy assistant. This project recreates the classic Windows 98 desktop experience with a modern twist, built using Next.js and React.

## Features

- Authentic Windows 98 desktop environment
- Interactive notepad-style portfolio viewer
- Integrated Clippy AI assistant in the notepad sidebar
- Draggable and resizable windows
- Window management (minimize, maximize, close)
- Working taskbar with window management
- Classic system icons and styling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clippy.git
cd clippy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your X.AI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React with CSS Modules
- **AI Integration**: X.AI API
- **Styling**: Custom Windows 98 theme implementation
- **State Management**: React hooks and context
- **Image Optimization**: Next.js Image component

## Project Structure

- `/app` - Next.js app directory
  - `/components` - React components (Window, Portfolio, Taskbar, etc.)
  - `/desktop` - Desktop-related components and styles
  - `/api` - API routes for AI integration
- `/public` - Static assets (icons, images)

## Usage

- Click on `portfolio.txt` to open the portfolio viewer
- Use the integrated Clippy assistant in the sidebar to ask questions
- Interact with windows using the title bar buttons (minimize, maximize, close)
- Use the taskbar to manage open windows
- Experience the nostalgic Windows 98 interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Windows 98 design inspiration
- Next.js team for the amazing framework
- X.AI for the AI integration capabilities

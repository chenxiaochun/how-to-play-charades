import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog.html", destination: "/en/blog", permanent: true },
      { source: "/user-statement.html", destination: "/en/user-statement", permanent: true },
      { source: "/index.html", destination: "/en", permanent: true },
      { source: "/rules", destination: "/en/rules", permanent: true },
      { source: "/tips", destination: "/en/tips", permanent: true },
      { source: "/game", destination: "/en#game", permanent: true },
      { source: "/how-to-play", destination: "/en/rules", permanent: true },
      { source: "/charades-game-online", destination: "/en#game", permanent: true },
    ];
  },
};

export default nextConfig;

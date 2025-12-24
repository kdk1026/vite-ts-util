import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
    return {
        // Vite 설정
        server: {
            host: "0.0.0.0",
            port: 5173,
        },
    };
});

import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url, { tsconfigPaths: true });

export default await jiti.import("./next-sitemap.config.ts", { default: true });

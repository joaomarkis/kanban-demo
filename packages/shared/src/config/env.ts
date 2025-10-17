import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        JWT_SECRET: z.string().min(32),
    },
    runtimeEnv: {
        
    }
});
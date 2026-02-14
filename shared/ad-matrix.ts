import { z } from "zod";

export const generateMatrixRequestSchema = z.object({
  audience: z.string().min(1),
  languages: z.array(z.string().min(1)).min(1),
  variations: z.array(z.string().min(1)).min(1),
  campaignContext: z.string().min(1),
  logoBase64: z.string().min(1),
  productBase64: z.string().min(1),
});

export const matrixVariationSchema = z.object({
  style: z.string(),
  noiseWords: z.array(z.string()),
  headline: z.string(),
  subline: z.string(),
  bgGradient: z.string(),
  bgColor: z.string(),
  accentColor: z.string(),
  textColor: z.string(),
});

export const matrixColumnSchema = z.object({
  language: z.string(),
  variations: z.array(matrixVariationSchema),
});

export const generateMatrixResponseSchema = z.object({
  columns: z.array(matrixColumnSchema),
});

export type GenerateMatrixRequest = z.infer<typeof generateMatrixRequestSchema>;
export type MatrixVariation = z.infer<typeof matrixVariationSchema>;
export type MatrixColumn = z.infer<typeof matrixColumnSchema>;
export type GenerateMatrixResponse = z.infer<typeof generateMatrixResponseSchema>;
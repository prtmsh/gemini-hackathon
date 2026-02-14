import type { GenerateMatrixResponse } from "@shared/ad-matrix";

export const MATRIX_RESULT_SESSION_KEY = "brandSparkMatrixResult";

export type MatrixSessionPayload = {
  matrixData: GenerateMatrixResponse;
  logoBase64: string;
  productBase64: string;
};

export function saveMatrixSession(payload: MatrixSessionPayload) {
  sessionStorage.setItem(MATRIX_RESULT_SESSION_KEY, JSON.stringify(payload));
}

export function getMatrixSession(): MatrixSessionPayload | null {
  const rawValue = sessionStorage.getItem(MATRIX_RESULT_SESSION_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as MatrixSessionPayload;
  } catch {
    sessionStorage.removeItem(MATRIX_RESULT_SESSION_KEY);
    return null;
  }
}
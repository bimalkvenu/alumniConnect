export interface ApiError {
    response?: {
      data?: {
        success: boolean;
        error?: string;
        errors?: Record<string, string>;
        fields?: string[];
      };
      status: number;
      statusText: string;
    };
    message: string;
  }
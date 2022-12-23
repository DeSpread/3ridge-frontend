import { AppError } from "../error/my-error";

export type SuccessErrorCallback = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: AppError) => void;
}) => void;

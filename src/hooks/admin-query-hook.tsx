"use client";
import { useMutation } from "@apollo/client";

import { APP_ERROR_MESSAGE, AppError } from "../error/my-error";
import { CLEAR_PARTICIPATED_ALL_EVENTS_BY_USER_ID } from "../lib/apollo/query";

export function useAdminQuery(userId?: string) {
  const [ClearParticipatedAllEventsByUserId] = useMutation(
    CLEAR_PARTICIPATED_ALL_EVENTS_BY_USER_ID,
  );

  const asyncClearParticipatedAllEventsByUserId = async (userId: string) => {
    if (!userId) throw new AppError(APP_ERROR_MESSAGE.PARAMETER_ERROR);
    return await ClearParticipatedAllEventsByUserId({
      variables: {
        userId,
      },
    });
  };

  return { asyncClearParticipatedAllEventsByUserId };
}

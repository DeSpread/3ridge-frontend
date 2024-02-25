import { Quest } from "@/__generated__/graphql";
import PrimaryButton from "@/components/atomic/atoms/primary-button";
import { useUser } from "@/hooks/user/useUser";

interface QuestCompleteButtonProps {
  quest: Pick<Quest, "_id" | "completedUsers">;
}

export function QuestCompleteButton(props: QuestCompleteButtonProps) {
  const { user } = useUser();
  const { quest } = props;

  const isCompleted = quest.completedUsers
    .map((user) => user._id)
    .includes(user?._id);

  const isDisabled = isCompleted;

  function onClick() {}

  return (
    <PrimaryButton size="medium" disabled={isDisabled} onClick={onClick}>
      확인하기
    </PrimaryButton>
  );
}

import { QuestCompleteButton } from "./completeButton";

import { Quest } from "@/__generated__/graphql";
import ContentMetaDataRenderComponent from "@/components/atomic/atoms/content-meta-data-render-component";
import PrimaryButton from "@/components/atomic/atoms/primary-button";
import { useUser } from "@/hooks/user/useUser";

interface QuestListItemProps {
  quest: Pick<Quest, "_id" | "title_v2" | "completedUsers">;
}

export function QuestListItemLoading() {
  return (
    <li className="flex animate-pulse items-center justify-between rounded-lg bg-neutral-800 px-6 py-8">
      <h4 className="text-lg font-bold">
        <div className="h-3 w-20 rounded bg-slate-200"></div>
      </h4>

      <div>
        <PrimaryButton size="medium">확인하기</PrimaryButton>
      </div>
    </li>
  );
}

export function QuestListItem(props: QuestListItemProps) {
  const { quest } = props;

  return (
    <li className="flex items-center justify-between rounded-lg bg-neutral-800 px-6 py-8">
      <h4 className="text-lg font-bold">
        <ContentMetaDataRenderComponent
          contentMetaData={quest.title_v2}
        ></ContentMetaDataRenderComponent>
      </h4>

      <div>
        <QuestCompleteButton quest={quest} />
      </div>
    </li>
  );
}

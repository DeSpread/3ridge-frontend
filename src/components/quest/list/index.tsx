"use client";

import { Suspense } from "react";

import { QuestListItem, QuestListItemLoading } from "./item";

import { useQuests } from "@/hooks/quest";

export * from "./item";

interface QuestListProps {
  eventId: string;
}

function QuestListLoading() {
  return (
    <section>
      <ul className="flex flex-col gap-8">
        <QuestListItemLoading />
        <QuestListItemLoading />
      </ul>
    </section>
  );
}

function QuestList(props: QuestListProps) {
  const { quests } = useQuests(props.eventId);

  if (!quests) {
    throw new Error("quests is undefined");
  }

  return (
    <section>
      <ul className="flex flex-col gap-8">
        {quests.map((quest) => (
          <QuestListItem key={quest._id} quest={quest} />
        ))}
      </ul>
    </section>
  );
}

export default function SuspenseQuestList(props: QuestListProps) {
  return (
    <Suspense fallback={<QuestListLoading />}>
      <QuestList {...props} />
    </Suspense>
  );
}

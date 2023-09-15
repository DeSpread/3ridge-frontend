import { gql } from "../../../__generated__/gql";

// FIXME: need to fix codegen
export const GET_All_TICKETS = gql(`
  query AllTickets(
    $sort: TicketSortType
    $status: TicketStatusType
    $eventTypes: [EventType!]
    $isVisibleOnly: Boolean
    $limit: Int
    $skip: Int
  ) {
    tickets(
      sort: $sort
      status: $status
      eventTypes: $eventTypes
      isVisibleOnly: $isVisibleOnly
      limit: $limit
      skip: $skip
    ) {
      _id
      beginTime
      untilTime
      completed
      description
      description_v2 {
        contentFormatType
        contentEncodingType
        content
      }
      participants {
        _id
        name
        profileImageUrl
      }
      imageUrl
      quests {
        _id
        title
        title_v2 {
          contentFormatType
          contentEncodingType
          content
        }
        description
        questPolicy {
          context
          questPolicy
        }
      }
      project {
        _id
        categories
        description
        imageUrl
        name
        projectSocial {
          discordUrl
          officialUrl
          telegramUrl
          twitterUrl
          mediumUrl
          naverBlogUrl
        }
      }
      rewardPolicy {
        context
        rewardPoint
        rewardPolicyType
      }
      title
      winners {
        name
      }
      visible
    }
  }
`);

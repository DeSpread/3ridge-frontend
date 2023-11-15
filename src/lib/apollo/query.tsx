import { gql } from "../../__generated__";

export const GET_USERS_ORDER_BY_REWARD_POINT_DESC = gql(/* GraphQL */ `
  query GetUsersOrderByRewardPointDesc($skip: Int = 0, $limit: Int = 25) {
    usersOrderByRewardPointDesc(skip: $skip, limit: $limit) {
      _id
      name
      profileImageUrl
      email
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
      }
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const FIND_RANK_BY_USER_ID = gql(/* GraphQL */ `
  query FindRankByUserId($userId: String!) {
    findRankByUserId(userId: $userId)
  }
`);

export const GET_USER_BY_KAKAO_ID = gql(/* GraphQL */ `
  query GetUserByKakaoId($kakaoId: Float!) {
    userByKakaoId(kakaoId: $kakaoId) {
      _id
      email
      gmail
      name
      participatingTickets {
        _id
        imageUrl
        description
        project {
          _id
          categories
          description
          imageUrl
          name
        }
        rewardPolicy {
          context
          rewardPoint
          rewardPolicyType
        }
        title
        winners {
          _id
          name
        }
        quests {
          _id
        }
      }
      profileImageUrl
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
      wallets {
        address
        chain
      }
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const GET_USER_BY_NAME = gql(/* GraphQL */ `
  query GetUserByName($name: String!) {
    userByName(name: $name) {
      _id
      email
      gmail
      name
      participatingTickets {
        _id
        imageUrl
        description
        project {
          _id
          categories
          description
          imageUrl
          name
        }
        rewardPolicy {
          context
          rewardPoint
          rewardPolicyType
        }
        title
        winners {
          _id
          name
        }
        quests {
          _id
        }
      }
      profileImageUrl
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
      wallets {
        address
        chain
      }
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const GET_USER_BY_EMAIL = gql(/* GraphQL */ `
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      name
      profileImageUrl
      email
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const GET_USER_BY_GMAIL = gql(/* GraphQL */ `
  query userByGmail($gmail: String!) {
    userByGmail(gmail: $gmail) {
      _id
      name
      profileImageUrl
      gmail
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const GET_USER_BY_WALLET_ADDRESS = gql(/* GraphQL */ `
  query GetUserByWalletAddress($walletAddress: String!) {
    userByWalletAddress(walletAddress: $walletAddress) {
      _id
      name
      profileImageUrl
      email
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const SEND_AUTH_CODE = gql(/* GraphQL */ `
  mutation sendAuthCode($email: String!) {
    sendAuthCode(to: $email)
  }
`);

export const CREATE_USER_BY_EMAIL = gql(/* GraphQL */ `
  mutation CreateUserByEmail($email: String!) {
    createUserByEmail(email: $email) {
      name
    }
  }
`);

export const CREATE_USER_BY_GMAIL = gql(/* GraphQL */ `
  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {
    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {
      name
    }
  }
`);

export const CREATE_USER_BY_WALLET = gql(/* GraphQL */ `
  mutation CreateUserByWallet($address: String!, $chain: ChainType!) {
    createUserByWallet(address: $address, chain: $chain) {
      name
    }
  }
`);

export const CREATE_USER_BY_KAKAO = gql(/* GraphQL */ `
  mutation CreateUserByKakao($kakaoInfo: KakaoInputType!) {
    createUserByKakao(kakaoInfo: $kakaoInfo) {
      name
    }
  }
`);

export const UPDATE_USER_WALLET_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserWalletByName(
    $name: String!
    $wallets: [UserWalletInputType!]
  ) {
    updateUserByName(name: $name, userUpdateInput: { wallets: $wallets }) {
      wallets {
        address
        chain
      }
    }
  }
`);

export const UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserProfileImageByName(
    $name: String!
    $profileImageUrl: String!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { profileImageUrl: $profileImageUrl }
    ) {
      profileImageUrl
    }
  }
`);

export const UPDATE_USER_APP_AGREEMENT_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserAppAgreementByName(
    $name: String!
    $appAgreement: AppAgreementInputType!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { appAgreement: $appAgreement }
    ) {
      appAgreement {
        marketingPermission
      }
    }
  }
`);

export const UPDATE_USER_BY_EMAIL = gql(/* GraphQL */ `
  mutation UpdateUserEmailByName($name: String!, $email: String!) {
    updateUserByName(name: $name, userUpdateInput: { email: $email }) {
      email
    }
  }
`);

export const UPDATE_USER_REWARD_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserRewardByName($name: String!, $rewardPoint: Float!) {
    updateUserByName(
      name: $name
      userUpdateInput: { rewardPoint: $rewardPoint }
    ) {
      rewardPoint
    }
  }
`);

export const UPDATE_USER_SOCIAL_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserSocialByName(
    $name: String!
    $userSocial: UserSocialInputType!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { userSocial: $userSocial }
    ) {
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const UPDATE_USER_DISCORD_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserDiscordByName($name: String!, $discord: DiscordInputType) {
    updateUserByName(name: $name, userUpdateInput: { discord: $discord }) {
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
    }
  }
`);

export const UPDATE_USER_BY_TWITTER = gql(/* GraphQL */ `
  mutation UpdateUserTwitterByName($name: String!, $twitterId: String!) {
    updateUserByName(
      name: $name
      userUpdateInput: { userSocial: { twitterId: $twitterId } }
    ) {
      userSocial {
        twitterId
      }
    }
  }
`);

export const UPDATE_USER_TELEGRAM_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserTelegramByName(
    $name: String!
    $telegramUser: TelegramUserInputType!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { userSocial: { telegramUser: $telegramUser } }
    ) {
      userSocial {
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const UPDATE_KAKAO_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateKakaoByName($name: String!, $kakaoInfo: KakaoInputType!) {
    updateKakaoByName(name: $name, kakaoInfo: $kakaoInfo) {
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
        kakao_account {
          age_range
          age_range_needs_agreement
          birthday
          birthday_needs_agreement
          birthday_type
          gender
          gender_needs_agreement
          has_age_range
          has_birthday
          has_gender
          profile_image_needs_agreement
          profile_nickname_needs_agreement
        }
      }
    }
  }
  #  mutation UpdateKakaoByName(
  #    $name: String!
  #    $authCode: String!
  #    $redirectUri: String!
  #  ) {
  #    updateKakaoByName(
  #      authCode: $authCode
  #      name: $name
  #      redirectUri: $redirectUri
  #    ) {
  #      kakao {
  #        id
  #        connected_at
  #        properties {
  #          nickname
  #          profile_image
  #          thumbnail_image
  #        }
  #      }
  #    }
  #  }
`);

export const DELETE_KAKAO_BY_NAME = gql(/* GraphQL */ `
  mutation DeleteKakaoByName($name: String!) {
    deleteKakaoByName(name: $name) {
      _id
    }
  }
`);

export const DELETE_DISCORD_BY_NAME = gql(/* GraphQL */ `
  mutation DeleteDiscordByName($name: String!) {
    deleteDiscordByName(name: $name) {
      _id
    }
  }
`);

export const GET_TICKETS = gql(/* GraphQL */ `
  query Tickets(
    $sort: TicketSortType
    $status: TicketStatusType
    $eventTypes: [EventType!]
    $isVisibleOnly: Boolean
  ) {
    tickets(
      sort: $sort
      status: $status
      eventTypes: $eventTypes
      isVisibleOnly: $isVisibleOnly
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
      shortDescription
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
          kakaoUrl
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

export const GET_TICKET_BY_ID = gql(/* GraphQL */ `
  query GetTicketById($id: String!) {
    ticketById(ticketId: $id) {
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
      shortDescription
      participants {
        _id
        name
        profileImageUrl
      }
      participantCount
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
        questGuides {
          contentFormatType
          content
          contentEncodingType
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
      rewardClaimedUsers {
        _id
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
          kakaoUrl
        }
      }
      visible
    }
  }
`);

export const GET_PROJECTS = gql(/* GraphQL */ `
  query Projects($eventTypes: [EventType!]) {
    projects(eventTypes: $eventTypes) {
      _id
      categories
      description
      imageUrl
      name
      priority
      projectSocial {
        discordUrl
        officialUrl
        telegramUrl
        twitterUrl
        mediumUrl
        naverBlogUrl
        kakaoUrl
      }
    }
  }
`);

export const GET_PROJECT_BY_ID = gql(/* GraphQL */ `
  query ProjectById($projectId: String!) {
    projectById(projectId: $projectId) {
      _id
      categories
      description
      imageUrl
      name
      priority
      projectSocial {
        discordUrl
        officialUrl
        telegramUrl
        twitterUrl
        mediumUrl
        naverBlogUrl
        kakaoUrl
      }
    }
  }
`);

export const GET_TICKETS_BY_PROJECT_ID = gql(/* GraphQL */ `
  query TicketsByProjectId(
    $projectId: String!
    $sort: TicketSortType
    $status: TicketStatusType
    $eventTypes: [EventType!]
    $isVisibleOnly: Boolean
  ) {
    ticketsByProjectId(
      projectId: $projectId
      sort: $sort
      status: $status
      eventTypes: $eventTypes
      isVisibleOnly: $isVisibleOnly
    ) {
      _id
      completed
      description
      description_v2 {
        contentFormatType
        contentEncodingType
        content
      }
      participants {
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
          kakaoUrl
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

export const VERIFY_TWITTER_LIKING_RTWEET_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterLinkingAndRetweetQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterLinkingAndRetweetQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_TWITTER_LIKING_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterLikingQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterLikingQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_TWITTER_FOLLOW_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterFollowQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterFollowQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_TWITTER_RETWEET_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterRetweetQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterRetweetQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_3RIDGE_POINT_QUEST = gql(/* GraphQL */ `
  mutation Verify3ridgePoint(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verify3ridgePoint(questId: $questId, ticketId: $ticketId, userId: $userId) {
      _id
    }
  }
`);

export const VERIFY_DISCORD_QUEST = gql(/* GraphQL */ `
  mutation VerifyDiscordQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyDiscordQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const IS_COMPLETED_QUEST_BY_USER_ID = gql(/* GraphQL */ `
  query IsCompletedQuestByUserId($questId: String!, $userId: String!) {
    isCompletedQuestByUserId(questId: $questId, userId: $userId) {
      isCompleted
      questId
    }
  }
`);

export const COMPLETE_QUEST_OF_USER = gql(/* GraphQL */ `
  mutation CompleteQuestOfUser(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    completeQuestOfUser(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
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
  }
`);

export const CLAIM_REWARD = gql(/* GraphQL */ `
  mutation ClaimReward($ticketId: String!, $userId: String!) {
    claimReward(ticketId: $ticketId, userId: $userId)
  }
`);

export const VERIFY_APTOS_QUEST = gql(/* GraphQL */ `
  mutation VerifyAptosQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyAptosQuest(questId: $questId, ticketId: $ticketId, userId: $userId) {
      _id
    }
  }
`);

export const IS_REGISTER_WALLET = gql(/* GraphQL */ `
  query IsRegisteredWallet($address: String!, $chain: ChainType!) {
    isRegisteredWallet(address: $address, chain: $chain)
  }
`);

export const CLEAR_PARTICIPATED_ALL_EVENTS_BY_USER_ID = gql(/* GraphQL */ `
  mutation ClearParticipatedAllEventsByUserId($userId: String!) {
    clearParticipatedAllEventsByUserId(userId: $userId)
  }
`);

export const UPDATE_TICKET_VISIBLE = gql(/* GraphQL */ `
  mutation UpdateTicketVisible($ticketId: String!, $visible: Boolean) {
    updateTicketById(ticketId: $ticketId, visible: $visible) {
      _id
    }
  }
`);

export const UPDATE_TICKET_SHORT_DESCRIPTION = gql(/* GraphQL */ `
  mutation UpdateTicketShortDescription(
    $ticketId: String!
    $shortDescription: String
  ) {
    updateTicketById(ticketId: $ticketId, shortDescription: $shortDescription) {
      _id
    }
  }
`);

export const UPDATE_TICKET_IMAGE_URL = gql(/* GraphQL */ `
  mutation UpdateTicketImageUrl($ticketId: String!, $imageUrl: String) {
    updateTicketById(ticketId: $ticketId, imageUrl: $imageUrl) {
      _id
    }
  }
`);

export const UPDATE_TICKET_TITLE = gql(/* GraphQL */ `
  mutation UpdateTicketTitle($ticketId: String!, $title: String) {
    updateTicketById(ticketId: $ticketId, title: $title) {
      _id
    }
  }
`);

export const UPDATE_TICKET_PROJECT = gql(/* GraphQL */ `
  mutation UpdateTicketProject($ticketId: String!, $project: String) {
    updateTicketById(ticketId: $ticketId, project: $project) {
      _id
    }
  }
`);

export const UPDATE_TICKET_DATE_RANGE_TIME = gql(/* GraphQL */ `
  mutation UpdateTicketDateRangeTime(
    $ticketId: String!
    $beginTime: DateTime
    $untilTime: DateTime
  ) {
    updateTicketById(
      ticketId: $ticketId
      beginTime: $beginTime
      untilTime: $untilTime
    ) {
      _id
    }
  }
`);

export const UPDATE_TICKET_DESCRIPTION = gql(/* GraphQL */ `
  mutation UpdateTicketDescription(
    $ticketId: String!
    $description_v2: ContentMetadataInputType
  ) {
    updateTicketById(ticketId: $ticketId, description_v2: $description_v2) {
      _id
    }
  }
`);

export const UPDATE_TICKET_REWARD_POLICY = gql(/* GraphQL */ `
  mutation UpdateTicketRewardPolicy(
    $ticketId: String!
    $rewardPolicy: RewardPolicyInputType
  ) {
    updateTicketById(ticketId: $ticketId, rewardPolicy: $rewardPolicy) {
      _id
    }
  }
`);

export const CREATE_QUEST = gql(/* GraphQL */ `
  mutation CreateQuest(
    $ticketId: String!
    $title_v2: ContentMetadataInputType
    $description: String
    $questPolicy: QuestPolicyInputType
  ) {
    createQuest(
      ticketId: $ticketId
      title_v2: $title_v2
      description: $description
      questPolicy: $questPolicy
    ) {
      _id
    }
  }
`);

export const DELETE_QUEST = gql(/* GraphQL */ `
  mutation DeleteQuest($questId: String!, $ticketId: String!) {
    deleteQuest(questId: $questId, ticketId: $ticketId)
  }
`);

export const UPDATE_QUEST = gql(/* GraphQL */ `
  mutation UpdateQuest(
    $description: String!
    $id: String!
    $questPolicy: QuestPolicyInputType
    $title_v2: ContentMetadataInputType
  ) {
    updateQuest(
      description: $description
      id: $id
      questPolicy: $questPolicy
      title_v2: $title_v2
    ) {
      _id
    }
  }
`);

export const CREATE_TICKET = gql(/* GraphQL */ `
  mutation CreateTicket(
    $beginTime: DateTime
    $untilTime: DateTime
    $title: String
    $description_v2: ContentMetadataInputType
    $imageUrl: String
    $rewardPolicy: RewardPolicyInputType
  ) {
    createTicket(
      beginTime: $beginTime
      description_v2: $description_v2
      imageUrl: $imageUrl
      rewardPolicy: $rewardPolicy
      title: $title
      untilTime: $untilTime
    ) {
      _id
    }
  }
`);

export const DELETE_TICKET = gql(/* GraphQL */ `
  mutation DeleteTicket($ticketId: String!) {
    removeTicketById(ticketId: $ticketId)
  }
`);

export const VERIFY_SURVEY_QUEST = gql(/* GraphQL */ `
  mutation VerifySurveyQuest(
    $questId: String!
    $surveyContents: [String!]!
    $ticketId: String!
    $userId: String!
  ) {
    verifySurveyQuest(
      questId: $questId
      surveyContents: $surveyContents
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_SCREENSHOT_QUEST = gql(/* GraphQL */ `
  mutation VerifyScreenShotQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
    $picUris: [String!]!
  ) {
    verifyScreenShotQuest(
      questId: $questId
      picUris: $picUris
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const DELETE_PROJECT_BY_ID = gql(/* GraphQL */ `
  mutation RemoveProject($projectId: String!) {
    removeProject(projectId: $projectId) {
      _id
    }
  }
`);

export const CREATE_PROJECT = gql(/* GraphQL */ `
  mutation CreateProject(
    $name: String!
    $categories: [CategoryType!]
    $priority: Float
    $description: String
    $imageUrl: String
    $projectSocial: ProjectSocialInputType
  ) {
    createProject(
      name: $name
      categories: $categories
      priority: $priority
      description: $description
      imageUrl: $imageUrl
      projectSocial: $projectSocial
    ) {
      _id
    }
  }
`);

export const UPDATE_PROJECT = gql(/* GraphQL */ `
  mutation UpdateProject(
    $projectId: String!
    $description: String
    $imageUrl: String
    $name: String
    $priority: Float
    $projectSocial: ProjectSocialInputType
  ) {
    updateProject(
      projectId: $projectId
      description: $description
      imageUrl: $imageUrl
      name: $name
      priority: $priority
      projectSocial: $projectSocial
    ) {
      _id
    }
  }
`);

export const REORDER_PROJECT = gql(/* GraphQL */ `
  mutation reorderProject($projectId: String!, $to: Float!) {
    reorderProject(projectId: $projectId, to: $to)
  }
`);

export const VERIFY_ONCHAIN_QUEST = gql(/* GraphQL */ `
  mutation VerifyOnChainQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyOnChainQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_TELEGRAM_QUEST = gql(/* GraphQL */ `
  mutation VerifyTelegramQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTelegramQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const GET_All_TICKETS = gql(/* GraphQL */ `
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
      shortDescription
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
          kakaoUrl
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

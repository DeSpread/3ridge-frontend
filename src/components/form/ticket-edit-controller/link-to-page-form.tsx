import Container from "../../atomic/atoms/container";
import LinkTypography from "../../atomic/atoms/link-typography";
import { PropsWithChildren } from "react";

const LinkToPageForm = (props: PropsWithChildren & { ticketId: string }) => {
  return (
    <Container>
      <LinkTypography href={`/event/${props.ticketId}`}>
        페이지로 이동
      </LinkTypography>
    </Container>
  );
};

export default LinkToPageForm;

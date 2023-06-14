import Router from "next/router";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import SimpleDialog from "./dialogs/simple-dialog";
import LinkTypography from "./atoms/link-typography";
import { getErrorMessage } from "../error/my-error";

type ErrorBoundaryProps = React.PropsWithChildren<{}>;

interface ErrorBoundaryState {
  error: Error | null;
}

const errorBoundaryState: ErrorBoundaryState = {
  error: null,
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryState;
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { error };
  }

  private resetState = () => {
    this.setState(errorBoundaryState);
  };

  private setError = (error: Error) => {
    console.error(error);

    this.setState({ error });
  };

  // 전역 에러 중 캐치하지 못한 에러
  private handleError = (event: ErrorEvent) => {
    this.setError(event.error);
    event.preventDefault?.();
  };

  // promise 중 캐치하지 못한 rejection
  private handleRejectedPromise = (event: PromiseRejectionEvent) => {
    event?.promise?.catch?.(this.setError);
    event.preventDefault?.();
  };

  componentDidMount() {
    window.addEventListener("error", this.handleError);
    window.addEventListener("unhandledrejection", this.handleRejectedPromise);

    Router.events.on("routeChangeStart", this.resetState);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleError);
    window.removeEventListener(
      "unhandledrejection",
      this.handleRejectedPromise
    );

    Router.events.off("routeChangeStart", this.resetState);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <>
          {this.props.children}
          <SimpleDialog
            open={true}
            title={"예상치 못한 문제가 발생하였습니다"}
            onClose={() => {
              this.setState({ error: null });
            }}
            onCloseBtnClicked={() => {
              this.setState({ error: null });
            }}
          >
            <Stack>
              <Typography>오류 내용</Typography>
              <Box sx={{ marginBottom: 1 }}>
                <Typography variant={"body1"}>
                  {getErrorMessage(error)}
                </Typography>
              </Box>
              <Typography>문제가 지속될 경우</Typography>
              <Typography>
                아래 이메일 링크로 개발자에게 문의해 보세요
              </Typography>
              <LinkTypography
                sx={{
                  fontWeight: "bold",
                  color: "#f8810a",
                  "&:hover": {
                    color: "#904e1d",
                    textDecoration: "underline",
                  },
                }}
                href={"mailto:hans@despread.io?Subject=에러문의사항"}
              >
                이메일 문의
              </LinkTypography>
            </Stack>
          </SimpleDialog>
        </>
      );
    }

    // console.log("unhandled client error");

    return this.props.children;
  }
}

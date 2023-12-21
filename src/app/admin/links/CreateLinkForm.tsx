"use client";
import { ApolloError } from "@apollo/client/errors";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import { useCreateLink } from "./useCreateLink";

interface CreateLinkFormProps {
  onSuccess?: VoidFunction;
}

export default function CreateLinkForm(props: CreateLinkFormProps) {
  const { createLink } = useCreateLink();

  const [href, setHref] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");

  const [isOpenSuccessMessage, setIsOpenSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  function handleOpenSuccessMessage() {
    setIsOpenSuccessMessage(true);
  }

  function handleCloseSuccessMessage() {
    setIsOpenSuccessMessage(false);
  }

  function handleOpenErrorMessage(msg: string) {
    setErrorMessage(msg);
  }

  function handleCloseErrorMessage() {
    setErrorMessage(undefined);
  }

  function handleError(error: ApolloError) {
    if (
      error.graphQLErrors.some(
        (error) => error.extensions.code === "ALREADY_EXIST_HREF",
      )
    ) {
      handleOpenErrorMessage("[링크 생성하기] 이미 존재하는 href가 있습니다");
      return;
    }

    handleOpenErrorMessage("[링크 생성하기] 알 수 없는 오류");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createLink({
      href,
      attributes: [
        {
          key: "utm_source",
          value: utmSource,
        },
        {
          key: "utm_medium",
          value: utmMedium,
        },
      ],
    })
      .then(clearInputs)
      .then(handleOpenSuccessMessage)
      .then(props.onSuccess)
      .catch(handleError);
  }

  function handleChangeHref(e: ChangeEvent<HTMLInputElement>) {
    setHref(e.target.value);
  }

  function handleChangeUtmSource(e: ChangeEvent<HTMLInputElement>) {
    setUtmSource(e.target.value);
  }

  function handleChangeUtmMedium(e: ChangeEvent<HTMLInputElement>) {
    setUtmMedium(e.target.value);
  }

  function clearInputs() {
    setHref("");
    setUtmSource("");
    setUtmMedium("");
  }

  return (
    <>
      <Snackbar
        open={isOpenSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          링크가 생성되었어요!
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
      >
        <Alert
          onClose={handleCloseErrorMessage}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col flex-wrap gap-3">
          <div>
            <TextField
              type="text"
              name="href"
              label="href"
              required
              value={href}
              onChange={handleChangeHref}
            />
          </div>
          <div className="flex gap-2">
            <TextField
              type="text"
              name="utm_source"
              inputProps={{ list: "utm-sources" }}
              label="utm_source"
              required
              value={utmSource}
              onChange={handleChangeUtmSource}
            />
            <datalist id="utm-sources">
              <option value="X"></option>
              <option value="telegram"></option>
              <option value="kakakotalk"></option>
            </datalist>
            <TextField
              type="text"
              name="utm_medium"
              inputProps={{ list: "utm-medium" }}
              label="utm_medium"
              required
              value={utmMedium}
              onChange={handleChangeUtmMedium}
            />
            <datalist id="utm-medium">
              <option value="social"></option>
              <option value="cpc"></option>
              <option value="banner"></option>
            </datalist>
          </div>
          <div>
            <Button type="submit" variant="contained">
              생성
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

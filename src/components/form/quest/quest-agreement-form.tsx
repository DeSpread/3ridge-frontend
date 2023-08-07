import * as React from "react";
import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import PrimaryCard from "../../atomic/atoms/primary-card";
import {
  AgreementContent,
  AgreementEventParam,
  MouseEventWithParam,
} from "../../../types";
import { useTheme } from "@mui/material/styles";

export type QuestAgreementFormProps = PropsWithChildren & {
  cardSx?: CSSProperties;
  agreementContent?: AgreementContent;
  onSelectChanged?: MouseEventHandler;
  id?: number;
  isLast?: boolean;
};

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.neutral[800],
}));

const QuestAgreementOption = (props: {
  value: number;
  label: string;
  correct: boolean;
  selected: boolean;
  onCardItemClick: MouseEventHandler;
}) => {
  const theme = useTheme();
  return (
    <PrimaryCard
      cardSx={{
        borderWidth: 2,
        padding: 2,
        paddingTop: 1,
        paddingBottom: 1,
        background: props.selected
          ? props.correct
            ? "#204134"
            : "#461823"
          : "transparent",
        borderColor: props.selected ? "#a3d6ff" : "",
      }}
      withCardContent={false}
      onCardItemClick={props.onCardItemClick}
    >
      <FormControlLabel
        value={props.value}
        control={
          <StyledRadio
            sx={{
              color: props.selected
                ? props.correct
                  ? "#4fdc8b"
                  : "#e8374c"
                : theme.palette.neutral[100],
              "&.Mui-checked": {
                color: props.selected
                  ? props.correct
                    ? "#4fdc8b"
                    : "#e8374c"
                  : theme.palette.neutral[100],
              },
            }}
          />
        }
        label={
          <Typography
            variant={"body2"}
            sx={{
              wordBreak: "break-word",
              //@ts-ignore
              color: (theme) => theme.palette.neutral[100],
              marginLeft: 1,
            }}
          >
            {props.label}
          </Typography>
        }
      />
    </PrimaryCard>
  );
};

const QuestAgreementForm = (props: QuestAgreementFormProps) => {
  const { agreementContent } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [props.id]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined,
    value: string
  ) => {
    const _selectedIndex = parseInt(value);
    setSelectedIndex(_selectedIndex);
    const myEvent = {} as MouseEventWithParam<AgreementEventParam>;
    myEvent.params = {
      correct: _selectedIndex === agreementContent?.correctOptionIndex,
    };
    props?.onSelectChanged?.(myEvent);
  };

  return (
    <>
      <Stack direction={"column"}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={onChange}
            value={selectedIndex}
          >
            <Stack spacing={2}>
              {agreementContent?.options?.map((e, index) => {
                return (
                  <QuestAgreementOption
                    key={index}
                    label={e}
                    value={index}
                    correct={index === agreementContent?.correctOptionIndex}
                    selected={index === selectedIndex}
                    onCardItemClick={(e) => {
                      onChange(undefined, index.toString());
                      // setSelectedIndex(index);
                    }}
                  ></QuestAgreementOption>
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
        {/*{agreementContent?.correctOptionIndex === selectedIndex && (*/}
        {/*  <Stack*/}
        {/*    direction={"row"}*/}
        {/*    sx={{ marginTop: 2, marginBottom: 2 }}*/}
        {/*    alignItems={"center"}*/}
        {/*    justifyContent={"center"}*/}
        {/*  >*/}
        {/*    {props.isLast ? (*/}
        {/*      <Typography variant={"body2"}>축하합니다! 🎉</Typography>*/}
        {/*    ) : (*/}
        {/*      <Typography variant={"body2"}>잘하셨어요! 😊</Typography>*/}
        {/*    )}*/}
        {/*  </Stack>*/}
        {/*)}*/}
        {/*{selectedIndex !== -1 &&*/}
        {/*  agreementContent?.correctOptionIndex !== selectedIndex && (*/}
        {/*    <Stack*/}
        {/*      direction={"row"}*/}
        {/*      sx={{ marginTop: 2, marginBottom: 2 }}*/}
        {/*      alignItems={"center"}*/}
        {/*      justifyContent={"center"}*/}
        {/*    >*/}
        {/*      <Typography variant={"body2"}>*/}
        {/*        틀렸습니다 😅 다시 도전 해보세요~*/}
        {/*      </Typography>*/}
        {/*    </Stack>*/}
        {/*  )}*/}
        {/*{selectedIndex === -1 && (*/}
        {/*  <Stack*/}
        {/*    direction={"row"}*/}
        {/*    sx={{ marginTop: 2, marginBottom: 2 }}*/}
        {/*    alignItems={"center"}*/}
        {/*    justifyContent={"center"}*/}
        {/*  >*/}
        {/*    <Typography variant={"body2"}>&nbsp;</Typography>*/}
        {/*  </Stack>*/}
        {/*)}*/}
      </Stack>
    </>
  );
};

export default QuestAgreementForm;

import { Box, Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { PropsWithChildren } from "react";

interface TermAgreeItemProps extends PropsWithChildren {
  checked: boolean;
  termLink?: string;
  onChangeCheck?(event: React.ChangeEvent<HTMLInputElement>): void;
}

function TermAgreeItem(props: TermAgreeItemProps) {
  const { checked, termLink, onChangeCheck } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center", minWidth: 280 }}>
      <FormControlLabel
        label={props.children}
        control={<Checkbox checked={checked} onChange={onChangeCheck} />}
      />
      {termLink && (
        <Link href={termLink} target="_blank" sx={{ ml: "auto" }}>
          보기
        </Link>
      )}
    </Box>
  );
}

export default TermAgreeItem;

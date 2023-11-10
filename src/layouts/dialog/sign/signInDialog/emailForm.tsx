import { Button, TextField } from "@mui/material";

export default function EmailForm() {
  return (
    <div className="flex flex-col gap-2">
      <TextField
        tabIndex={0}
        fullWidth
        label="이메일"
        variant="outlined"
        placeholder="이메일 주소를 입력하세요."
      />
      <Button fullWidth variant="contained">
        이메일로 계속하기
      </Button>
    </div>
  );
}

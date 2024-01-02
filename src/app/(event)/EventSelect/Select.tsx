import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import Image from "next/image";

import useEvents from "./useEvents";

export function EventSelectLoading() {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-event-label">이벤트</InputLabel>
      <Select
        labelId="select-event-label"
        id="select-event"
        label="이벤트"
        placeholder="Loading"
        disabled
      />
    </FormControl>
  );
}

export default function EventSelect(props: SelectProps<string>) {
  const { events } = useEvents();

  return (
    <FormControl fullWidth>
      <InputLabel id="select-event-label" required={props.required}>
        이벤트
      </InputLabel>
      <Select
        labelId="select-event-label"
        id="select-event"
        label="이벤트"
        placeholder="이벤트를 선택해주세요"
        {...props}
      >
        {events.map((event) => (
          <MenuItem key={event._id} value={event._id ?? ""}>
            <div>
              <div className="flex items-center">
                {event.imageUrl && (
                  <Image
                    src={event.imageUrl}
                    alt={"thumbnail of event"}
                    width={30}
                    height={30}
                  />
                )}
                <div className="min-w-0 flex-1 overflow-hidden text-ellipsis">
                  {event.title}
                </div>
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

import SecondaryButton from "@/components/atomic/atoms/secondary-button";
import TextEditDialog from "@/components/dialogs/text-edit-dialog";
import { useTicketQuery } from "@/hooks/ticket-query-hook";
import { useLoading } from "@/provider/loading/loading-provider";
import { useState } from "react";

interface ShortDescriptionUpdateFormProps {
  ticketId?: string;
}

const ShortDescriptionUpdateForm = ({
  ticketId,
}: ShortDescriptionUpdateFormProps) => {
  const { ticketData, asyncUpdateShortDescription } = useTicketQuery({
    id: ticketId,
  });

  const { showLoading, closeLoading } = useLoading();

  const [openTextEditDialog, setOpenTextEditDialog] = useState(false);

  return (
    <>
      <SecondaryButton
        size={"small"}
        fullWidth
        onClick={() => setOpenTextEditDialog(true)}
      >
        설명 문구 설정
      </SecondaryButton>

      <TextEditDialog
        open={openTextEditDialog}
        title={"설명 문구 설정"}
        defaultText={ticketData.shortDescription}
        onCloseBtnClicked={(e) => {
          setOpenTextEditDialog(false);
        }}
        onConfirmBtnClicked={async (text) => {
          showLoading();
          await asyncUpdateShortDescription(text);
          setOpenTextEditDialog(false);
          closeLoading();
        }}
      />
    </>
  );
};

export default ShortDescriptionUpdateForm;

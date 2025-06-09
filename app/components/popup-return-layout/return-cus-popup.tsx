"use client";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import BlackLayer from "../common/black-layer";
import PopupHolder from "../common/popup-holder";
import ReturnsItemsPopup from "../orders/returns-items-popup";

export default function ReturnsItemsPopupCus() {
  const { popupState, closePopup } = usePopup();

  return (
    <>
      {popupState?.returnsItemsPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("returnsItemsPopup")} />
          <PopupHolder>
            <ReturnsItemsPopup returnId={popupState.returnsItemsPopup.data?.returnId} />
          </PopupHolder>
        </>
      )}
    </>
  );
}

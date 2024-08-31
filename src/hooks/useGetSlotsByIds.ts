import { useGetSlotByIdQuery } from "../redux/api/slotsApi";
import { useEffect, useState } from "react";

export const useGetSlotsByIds = (slotIds: string[]) => {
  const [slots, setSlots] = useState<{ startTime: string; endTime: string }[]>(
    []
  );

  useEffect(() => {
    const fetchSlots = async () => {
      const slotDataPromises = slotIds.map(
        (slotId) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useGetSlotByIdQuery(slotId).data
      );
      const slotDataArray = await Promise.all(slotDataPromises);
      const fetchedSlots = slotDataArray.map((slot) => ({
        startTime: slot?.startTime || "",
        endTime: slot?.endTime || "",
      }));
      setSlots(fetchedSlots);
    };

    fetchSlots();
  }, [slotIds]);

  return slots;
};

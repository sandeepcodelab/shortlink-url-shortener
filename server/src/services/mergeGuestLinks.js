import { Url } from "../models/url.models.js";
export const mergeGuestLinks = async (guest, userID) => {
  if (!guest || !userID) return;

  const mergedLinks = await Url.updateMany(
    { "createdBy.guest": guest },
    {
      $set: {
        "createdBy.user": userID,
      },
      $unset: {
        "createdBy.guest": "",
      },
    }
  );

  return mergedLinks;
};

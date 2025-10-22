export function getMissingImage(missingPetId) {
  switch (missingPetId) {
    case 1:
      return "/petId1.jpg";
    case 2:
      return "/petId2.jpg";
    case 3:
      return "/petId3.jpg";
    default:
      return "/image-default.png";
  }
}

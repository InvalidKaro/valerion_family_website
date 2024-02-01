import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faAdjust,
  faBook,
  faCheckSquare,
  faCircle,
  faCode,
  faCoffee,
  faPalette,
  faPen,
  faUser,
  fas,
} from "@fortawesome/free-solid-svg-icons";

export const CustomIcons = {
  developer: faCode,
  user: faUser,
  moderator: faAdjust,
  artist: faPalette,
  quarantine: faBook,
  manager: faPen,
};

library.add(
  fas,
  fab,
  faCheckSquare,
  faCoffee,
  ...Object.values(CustomIcons),
  faCircle
);

export default CustomIcons; // Export the custom Font Awesome icons

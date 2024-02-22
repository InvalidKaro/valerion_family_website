import {
  AddCircleOutline as AddCircleOutlineIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  ErrorOutline as ErrorOutlineIcon,
  HighlightOff as HighlightOffIcon,
  InfoOutlined as InfoOutlinedIcon,
  Search as SearchIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import React from 'react';

function IconCollection() {
  return (
    <div>
      <CloseIcon />
      <CheckCircleIcon />
      <ErrorOutlineIcon />
      <WarningIcon />
      <InfoOutlinedIcon />
      <HighlightOffIcon />
      <ThumbUpIcon />
      <ThumbDownIcon />
      <AddCircleOutlineIcon />
      <DeleteOutlineIcon />
      <EditIcon />
      <SearchIcon />
    </div>
  );
}

export default IconCollection;

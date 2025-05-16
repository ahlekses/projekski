import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import Box from "@mui/material/Box";

const iconDefaultColor = '#a0aec0';
const iconHoverColor = '#ffffff';

const Actionskie = ({ onEdit, onDelete, onView }) => (
  <Box>
    <Tooltip title="View">
      <IconButton
        onClick={onView}
        sx={{
          '& svg': { color: iconDefaultColor, transition: 'color 0.3s' },
          '&:hover svg': { color: iconHoverColor },
        }}
      >
        <Preview />
      </IconButton>
    </Tooltip>

    <Tooltip title="Edit">
      <IconButton
        onClick={onEdit}
        sx={{
          '& svg': { color: iconDefaultColor, transition: 'color 0.3s' },
          '&:hover svg': { color: iconHoverColor },
        }}
      >
        <Edit />
      </IconButton>
    </Tooltip>

    <Tooltip title="Delete">
      <IconButton
        onClick={onDelete}
        sx={{
          '& svg': { color: iconDefaultColor, transition: 'color 0.3s' },
          '&:hover svg': { color: iconHoverColor },
        }}
      >
        <Delete />
      </IconButton>
    </Tooltip>
  </Box>
);

export default Actionskie;

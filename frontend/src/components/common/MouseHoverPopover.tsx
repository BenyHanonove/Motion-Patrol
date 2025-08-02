import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface MouseHoverPopoverProps {
  title: string;
  desc: string;
  titleMinWidth: number;
}

const MouseHoverPopover: React.FC<MouseHoverPopoverProps> = ({
  title,
  desc,
  titleMinWidth,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        sx={{ minWidth: titleMinWidth }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {title}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{desc}</Typography>
      </Popover>
    </div>
  );
};

export default MouseHoverPopover;

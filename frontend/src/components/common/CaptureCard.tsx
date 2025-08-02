import React, { useRef } from "react";
import { Typography, Box, Button } from "@mui/material";

// Import custom hooks
import type { CaptureModel } from "@models/Capture.model";

// Import materiel ui icons
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

interface CaptureCardProps {
  capture: CaptureModel;
  onRemove: (capture: CaptureModel) => Promise<void>;
  onDownload: (capture: CaptureModel) => Promise<void>;
}

const CaptureCard: React.FC<CaptureCardProps> = ({
  capture,
  onRemove,
  onDownload,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFullscreen = () => {
    const img = imgRef.current;
    if (!img) return;

    if ("requestFullscreen" in img) {
      img.requestFullscreen();
    } else if ("webkitRequestFullscreen" in img) {
      (
        img as HTMLElement & {
          webkitRequestFullscreen: () => Promise<void>;
        }
      ).webkitRequestFullscreen();
    } else if ("msRequestFullscreen" in img) {
      (
        img as HTMLElement & {
          msRequestFullscreen: () => Promise<void>;
        }
      ).msRequestFullscreen();
    }
  };

  return (
    <Box
      key={capture.id}
      sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1, p: 1 }}
    >
      <Box
        component="img"
        src={capture.imageUrl}
        ref={imgRef}
        alt={`Capture ${capture.id}`}
        onClick={handleFullscreen}
        sx={{
          width: "100%",
          cursor: "pointer",
          objectFit: "cover",
        }}
      />

      <Box>
        <Typography variant="h5">{capture.cameraId}</Typography>
        <Typography>{capture.timestamp.toLocaleString()}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => onRemove(capture)}
          sx={{
            flex: 1,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeleteIcon />
            <Typography>Remove</Typography>
          </Box>
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => onDownload(capture)}
          sx={{
            flex: 1,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DownloadIcon />
            <Typography>Download</Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default CaptureCard;

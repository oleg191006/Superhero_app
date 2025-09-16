import { useRef } from "react";
import { Box, IconButton, Button } from "@mui/material";
import { Delete, AddPhotoAlternateOutlined } from "@mui/icons-material";
import { styles } from "./SuperheroImageUploader.styles";

interface Image {
  id: string;
  url: string;
}

interface ImageUploadProps {
  existingImages: Image[];
  newFiles: File[];
  onFileChange: (files: FileList) => void;
  onRemoveExistingImage: (id: string) => void;
  onRemoveNewFile: (index: number) => void;
}

export default function ImageUpload({
  existingImages,
  newFiles,
  onFileChange,
  onRemoveExistingImage,
  onRemoveNewFile,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFileChange(e.target.files);
    e.target.value = "";
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Button
        variant="outlined"
        startIcon={<AddPhotoAlternateOutlined />}
        sx={styles.addImageButton}
        onClick={() => fileInputRef.current?.click()}
      >
        Add Image
      </Button>

      <Box sx={styles.container}>
        {existingImages.map((img) => (
          <Box key={img.id} sx={styles.imageBox}>
            <img
              src={img.url}
              alt={`superhero-${img.id}`}
              width={150}
              height={150}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            <IconButton
              size="small"
              sx={styles.deleteButton}
              onClick={() => onRemoveExistingImage(img.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}

        {newFiles.map((file, index) => (
          <Box key={index} sx={styles.imageBox}>
            <img
              src={URL.createObjectURL(file)}
              alt={`new-file-${index}`}
              width={150}
              height={150}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            <IconButton
              size="small"
              sx={styles.deleteButton}
              onClick={() => onRemoveNewFile(index)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

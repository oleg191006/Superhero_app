import { Box, TextField } from "@mui/material";
import type { SuperheroDTO } from "../../../types/superhero/superhero.type";
import ImageUpload from "../superhero-image-uploader/SuperheroImageUploader";
import type { Image } from "../../../types/images/image.interface";

interface SuperheroFormFieldsProps {
  form: SuperheroDTO;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  newFiles: File[];
  onFileChange: (files: FileList) => void;
  existingImages: Image[];
  onRemoveExistingImage: (id: string) => void;
  onRemoveNewFile: (index: number) => void;
}

export default function SuperheroFormFields({
  form,
  handleChange,
  newFiles,
  onFileChange,
  existingImages,
  onRemoveExistingImage,
  onRemoveNewFile,
}: SuperheroFormFieldsProps) {
  return (
    <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        name="nickname"
        label="Nickname"
        value={form.nickname}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        name="real_name"
        label="Real Name"
        value={form.real_name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        name="origin_description"
        label="Origin Description"
        value={form.origin_description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        name="superpowers"
        label="Superpowers"
        value={form.superpowers}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        name="catch_phrase"
        label="Catch Phrase"
        value={form.catch_phrase}
        onChange={handleChange}
      />
      <ImageUpload
        newFiles={newFiles}
        onFileChange={onFileChange}
        existingImages={existingImages}
        onRemoveExistingImage={onRemoveExistingImage}
        onRemoveNewFile={onRemoveNewFile}
      />
    </Box>
  );
}

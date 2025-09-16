import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

import SuperheroFormFields from "./super-hero-form-fields/SuperheroFormFields";

import type { Superhero } from "@app-types/superhero/superhero.interface";
import { useSuperheroForm } from "@hooks/useSuperheroForm";

interface SuperheroFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: Partial<Superhero> | null;
  onSuccess: () => void;
  title: string;
}

export default function SuperheroFormModal({
  open,
  onClose,
  initialValues,
  onSuccess,
  title = "Superhero Form",
}: SuperheroFormModalProps) {
  const {
    form,
    newFiles,
    existingImages,
    loading,
    formErrors,
    handleChange,
    handleFileChange,
    handleRemoveExistingImage,
    handleRemoveNewFile,
    handleSubmit,
  } = useSuperheroForm({ initialValues, onSuccess, onClose, open });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <SuperheroFormFields
            form={form}
            handleChange={handleChange}
            onFileChange={handleFileChange}
            existingImages={existingImages}
            newFiles={newFiles}
            onRemoveExistingImage={handleRemoveExistingImage}
            onRemoveNewFile={handleRemoveNewFile}
            formErrors={formErrors}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
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
import type { Image } from "@app-types/images/image.interface";
import { imageService } from "@services/images-service";
import { superheroService } from "@services/superhero-service";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import type { SuperheroDTO } from "@app-types/superhero/superhero.type";

interface SuperheroFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: Partial<Superhero> | null;
  onSuccess: () => void;
  title: string;
}

type SuperheroFormState = SuperheroDTO & Partial<Pick<Superhero, "id">>;

const defaultValues: SuperheroDTO = {
  nickname: "",
  real_name: "",
  origin_description: "",
  superpowers: "",
  catch_phrase: "",
  images: [],
};

export default function SuperheroFormModal({
  open,
  onClose,
  initialValues,
  onSuccess,
  title = "Superhero Form",
}: SuperheroFormModalProps) {
  const [form, setForm] = useState<SuperheroFormState>(defaultValues);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ ...defaultValues, ...initialValues });
      setExistingImages(initialValues?.images || []);
      setNewFiles([]);
    }
  }, [open, initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (files: FileList) => {
    const filesArray = Array.from(files);
    setNewFiles((prev) => [...prev, ...filesArray]);
  };

  const handleRemoveExistingImage = async (imageId: string) => {
    try {
      setLoading(true);
      await imageService.deleteImage(imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      onSuccess();
    } catch (error) {
      console.error("Failed to delete image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveNewFile = (fileIndex: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== fileIndex));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: SuperheroDTO = {
        ...form,
        images: existingImages.map((img) => ({
          id: img.id,
          url: img.url,
          superheroId: form.id || "",
        })),
      };

      const savedSuperhero = form.id
        ? await superheroService.update(form.id, payload)
        : await superheroService.create(payload);

      if (newFiles.length > 0) {
        await Promise.all(
          newFiles.map((file) =>
            imageService.uploadImage(savedSuperhero.id, file)
          )
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setLoading(false);
    }
  };

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
